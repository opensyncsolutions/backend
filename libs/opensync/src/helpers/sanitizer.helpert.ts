import { BadRequestException, Logger } from '@nestjs/common';
import { Privilege, Role, User } from '../entities';
import { isUUID } from 'class-validator';
import { throwError } from './base.helper';

const omit = (
  responseObject: { [x: string]: any },
  responseObjectProps: any[],
) => {
  responseObject = { ...responseObject };
  responseObjectProps.forEach((prop) => delete responseObject[prop]);
  return responseObject;
};

const sanitizeNullError = (message: string) => {
  const column = message?.split('"');
  return `${column[1]} can not be null`;
};

const getNotFound = (message: string): string => {
  const splittedMessage = message?.split('Could not find any entity of type "');
  if (splittedMessage?.length > 0) {
    const finalMessage = splittedMessage[1]?.split(' matching');
    return finalMessage?.length > 0
      ? `${finalMessage[0]?.replace('"', '')} could not be found!`
      : message;
  }
  return message;
};

const sanitizeFinalMessage = (message: string): string => {
  return message?.includes('Could not find any entity of type')
    ? getNotFound(message)
    : message?.includes('data and salt arguments required')
      ? 'Password is required'
      : message?.includes('null value in column')
        ? sanitizeNullError(message)
        : message?.includes('no such file')
          ? 'Asset missing'
          : message?.includes('have a default value')
            ? message
                ?.split("doesn't have a default value")
                ?.join('can not be null')
            : message?.includes('Duplicate entry')
              ? 'Resource already exists'
              : message;
};

/**
 *
 * @param message
 * @returns message with first character in upper case
 */
export const messageToUpper = (message: string): string => {
  const firstCharacter =
    typeof message?.split(' ')[0] === 'string'
      ? message?.split(' ')[0][0].toUpperCase() +
        message?.split(' ')[0].substring(1)
      : null;
  const finalMessage = message?.split(' ');
  finalMessage[0] = firstCharacter ? firstCharacter : '';

  return finalMessage.join(' ');
};

const sanitizeMessage = (message: string) => {
  if (
    message?.includes('Cannot POST') ||
    message?.includes('Cannot GET') ||
    message?.includes('Cannot PATCH') ||
    message?.includes('Cannot DELETE') ||
    message?.includes('Cannot PUT') ||
    message?.includes('path must be absolute or specify root')
  ) {
    message = 'Oops 😢! Route not available.';
  }
  message = sanitizeFinalMessage(message);
  return messageToUpper(message);
};

const sanitizeSentence = (message: string) => {
  const messages = message?.split(/(?=[A-Z])/);
  return messages
    .filter((m: string) => m != '')
    .map((m) => m.toLowerCase())
    .join(' ');
};

export const errorSanitizer = (error: {
  detail: string;
  message: string | string[];
  response: { message: any[] };
  error?: any;
  table?: string;
  url?: string;
  method?: string;
}) => {
  let message: string;
  const detail = error?.detail;
  if (
    detail &&
    typeof detail === 'string' &&
    (detail?.includes('already exists') || detail?.includes('is not present'))
  ) {
    message = error?.table?.split('_').join(' ') + ' with';
    message = error.detail?.replace('Key', message);
    let columnPart = message?.split('=')[0];
    columnPart = columnPart
      ?.split(' ')
      ?.map((part) => sanitizeSentence(part))
      ?.join(' ');

    if (columnPart) {
      message = `${columnPart} ${message?.split('=')[1]}`;
    }
    if (detail?.includes('is not present')) {
      message = `${detail.split('(')[1]} could not be found`;
    }
  } else {
    message = error?.message?.includes('Bad Request error')
      ? error?.response?.message?.join(',')
      : error?.message || error?.error;
  }

  if (message?.includes('input syntax for type uuid:')) {
    Logger.error(message, 'UUID ERROR');
    message = 'Internal server error';
  }

  message = message?.split('(').join('');
  message = message?.split(')').join('');
  message = message?.split('=').join(' ');

  Logger.error(message, 'ERROR');
  if (error.url && error?.method)
    Logger.error(`${error?.method} ${error?.url}`, 'URL');

  message = sanitizeMessage(message);

  return message.includes('"') ? message?.split('"').join('') : message;
};

const selectedFields = (fields: string, key: string): boolean => {
  if (
    !fields ||
    fields === '*' ||
    (typeof fields === 'string' && fields.includes('*'))
  )
    return true;
  return fields.split(',').find((field) => field.includes(key)) !== undefined;
};

const sanitizeObject = (
  responseObject: any,
  resource: string,
  fields: string,
  validate: boolean,
) => {
  const newResponseObject: Record<string, unknown> = {};
  const attributeKeys = Object.keys(
    omit(responseObject, [
      'password',
      'salt',
      'email',
      'phoneNumber',
      'secret',
    ]),
  );
  attributeKeys.forEach((attributeKey) => {
    const attributeValue = responseObject[attributeKey];
    if (attributeValue || attributeValue === false || attributeValue === 0) {
      if (typeof attributeValue === 'object' && attributeKey !== 'assets') {
        if (Array.isArray(attributeValue)) {
          newResponseObject[attributeKey] = responseObject[attributeKey].map(
            (value: any) => sanitizeResponse(value, resource, fields, false),
          );
        } else {
          if (isNaN(Date.parse(attributeValue))) {
            newResponseObject[attributeKey] = sanitizeResponse(
              attributeValue,
              resource,
              fields,
              false,
            );
          } else {
            newResponseObject[attributeKey] = attributeValue;
          }
        }
      } else if (attributeKey === 'dp') {
        newResponseObject[attributeKey] =
          `/api/users/${attributeValue}/dps?id=${responseObject.id}`;
      } else if (attributeKey === 'assets') {
        newResponseObject[attributeKey] =
          `/api/${resource}/${attributeValue}/assets?id=${responseObject.id}`;
      } else {
        newResponseObject[attributeKey] = attributeValue;
      }
    }
    if (validate && !selectedFields(fields, attributeKey)) {
      delete newResponseObject[attributeKey];
    }
  });
  return newResponseObject;
};
const sanitizeRequestObject = (
  request: any,
  user: any,
  currentKey?: string,
) => {
  const newResponseObject: Record<string, unknown> = {};
  const attributeKeys = Object.keys(
    omit(request, [
      'lastLogin',
      'createdBy',
      'updatedBy',
      'secret',
      'level',
      'updated',
      'created',
    ]),
  );

  attributeKeys.forEach((attributeKey) => {
    let attributeValue: string | boolean | number | any;
    if (request[attributeKey] === false) {
      attributeValue = false;
    } else {
      attributeValue = request[attributeKey];
    }

    if (attributeKey === 'id' && !isUUID(attributeValue)) {
      throwError(
        new BadRequestException(
          `Invalid value ${attributeValue} ${currentKey ? 'for property ' + currentKey : 'for id'}`,
        ),
      );
    }

    if (
      !Array.isArray(attributeValue) &&
      typeof attributeValue === 'string' &&
      attributeValue?.includes('{') &&
      attributeValue?.includes('}')
    ) {
      newResponseObject[attributeKey] = JSON.parse(attributeValue);
    } else {
      if (attributeValue || attributeValue === false || attributeValue === 0) {
        if (typeof attributeValue === 'object') {
          if (Array.isArray(attributeValue)) {
            newResponseObject[attributeKey] = request[attributeKey].map(
              (value: any) => sanitizeRequest(value, user, attributeKey),
            );
          } else {
            if (isNaN(Date.parse(attributeValue))) {
              newResponseObject[attributeKey] = sanitizeRequest(
                attributeValue,
                user,
                attributeKey,
              );
            } else {
              newResponseObject[attributeKey] = attributeValue;
            }
          }
        } else if (
          !Array.isArray(attributeValue) &&
          typeof attributeValue === 'string' &&
          attributeValue?.includes('{') &&
          attributeValue?.includes('}')
        ) {
          newResponseObject[attributeKey] = JSON.parse(attributeValue);
        } else {
          newResponseObject[attributeKey] = attributeValue;
        }
      }
    }
  });
  if (!newResponseObject?.id && user?.id) {
    newResponseObject['createdBy'] = { id: user.id };
  }
  return newResponseObject;
};

export const sanitizeResponse: any = (
  responseObject: any,
  resource: string,
  fields: string,
  validate: boolean,
) => {
  if (Array.isArray(responseObject)) {
    return responseObject.map((response) =>
      sanitizeObject(response, resource, fields, validate),
    );
  }
  return sanitizeObject(responseObject, resource, fields, validate);
};
export const sanitizeRequest: any = (
  request: any,
  user: any,
  currentKey?: string,
) => {
  if (Array.isArray(request)) {
    return request.map((r) => sanitizeRequestObject(r, user, currentKey));
  }
  return sanitizeRequestObject(request, user, currentKey);
};

export const USERAUTHORITIES = (user: User) => {
  try {
    const roles = user?.roles?.map((role: Role) =>
      role?.privileges?.map((privilege: Privilege) => privilege.value),
    );
    return roles?.flat() ?? [];
  } catch (e) {
    Logger.error(e?.message?.toUpperCase(), 'ERROR AUTH');
    return [];
  }
};
