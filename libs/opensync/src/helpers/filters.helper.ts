import { Logger } from '@nestjs/common';
import {
  Between,
  EntityMetadata,
  FindOperator,
  ILike,
  In,
  IsNull,
  LessThan,
  Like,
  MoreThan,
  Not,
} from 'typeorm';
import { User } from '../entities';
import { GetManyReqInterface, GetOneReqInterface } from '../interfaces';

export const checkIfValidUUID = (id: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(id);
};

const hasIdKey = (obj: { [x: string]: any }) => {
  if ('id' in obj) {
    return true;
  }
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      if (hasIdKey(obj[key])) {
        return true;
      }
    }
  }
  return false;
};

const sortFields = (fields: string[], metaData: EntityMetadata) => {
  return fields.filter(
    (item: string) =>
      item?.indexOf('[') === -1 &&
      metaData.columns
        ?.map((metadataColumn) => {
          return metadataColumn.propertyName;
        })
        ?.indexOf(item) > -1,
  );
};

const getRelations = (fields: string[], metaData: EntityMetadata): string[] => {
  const entityRelations = metaData.relations.map(
    (relation) => relation.propertyPath,
  );

  let relations = fields.filter(
    (field) => entityRelations?.includes(field) || field?.includes('.'),
  );

  if (fields.includes('*')) {
    relations = [...new Set([...relations, ...entityRelations])];
  }
  return relations;
};
const verifyFields = (fields: any) => {
  if (fields && typeof fields !== 'string') {
    throw new Error(
      `[Fields] Expected a string but received an ${typeof fields}.`,
    );
  }
};

const innerFilters = (filter: string[], value: any) => {
  if (filter?.length === 0) {
    switch (value) {
      case '!null':
        return Not(IsNull());

      case 'null':
        return IsNull();

      default:
        return value;
    }
    // return value === '!null' ? Not(IsNull()) : value;
  }
  const key = filter[0];
  const restOfArray = filter.slice(1);
  const nestedObject = {};
  nestedObject[key] = innerFilters(restOfArray, value);
  return nestedObject;
};

const equalFilter = (filterSplit: string[], isEqual = true) => {
  if (filterSplit[0].includes('.')) {
    return innerFilters(
      filterSplit[0]?.split('.'),
      isEqual ? filterSplit[2] : Not(filterSplit[2]),
    );
  }
  if (filterSplit[2] === 'null' || filterSplit[2] === 'NULL') {
    return { [filterSplit[0]]: isEqual ? IsNull() : Not(IsNull()) };
  }
  if (filterSplit[2] === '!null' || filterSplit[2] === '!NULL') {
    return { [filterSplit[0]]: Not(IsNull()) };
  }
  if (filterSplit[0] == 'id') {
    return { id: checkIfValidUUID(filterSplit[2]) ? filterSplit[2] : null };
  }
  return { [filterSplit[0]]: isEqual ? filterSplit[2] : Not(filterSplit[2]) };
};

const greaterThan = (filterSplit: string[]) => {
  if (filterSplit[0]?.includes('.')) {
    return innerFilters(filterSplit[0]?.split('.'), MoreThan(filterSplit[2]));
  }

  return { [filterSplit[0]]: MoreThan(filterSplit[2]) };
};
const lessThan = (filterSplit: string[]) => {
  if (filterSplit[0]?.includes('.')) {
    return innerFilters(filterSplit[0]?.split('.'), LessThan(filterSplit[2]));
  }

  return { [filterSplit[0]]: LessThan(filterSplit[2]) };
};

const getInFilterArray = (filter: string): string[] => {
  return filter
    ?.slice(1, -1)
    ?.split(',')
    ?.map((filters: any) => filters);
};

const getInFilter = (filterSplit: string[]) => {
  return { [filterSplit[0]]: In(getInFilterArray(filterSplit[2])) };
};

const likeFilter = (filterSplit: string[]) => {
  if (filterSplit[0]?.includes('.')) {
    return innerFilters(filterSplit[0].split('.'), Like(`%${filterSplit[2]}%`));
  }
  return { [filterSplit[0]]: Like(`%${filterSplit[2]}%`) };
};
const ilikeFilter = (filterSplit: string[], isIlike = true) => {
  if (filterSplit[0]?.includes('.')) {
    return innerFilters(
      filterSplit[0]?.split('.'),
      isIlike
        ? ILike(`%${filterSplit[2]}%`)
        : Not(ILike(`%${filterSplit[2]}%`)),
    );
  }
  return {
    [filterSplit[0]]: isIlike
      ? ILike(`%${filterSplit[2]}%`)
      : Not(ILike(`%${filterSplit[2]}%`)),
  };
};

export const getDates = ({ startString, endString }) => {
  const date = new Date(startString);
  date.setDate(date.getDate() - 1);
  const startDate = date.toISOString();
  const dates = new Date(endString);
  dates.setDate(dates.getDate() + 1);
  const endDate = dates.toISOString();

  return { startDate, endDate };
};

const betweenFilter = (filterSplit: string[]) => {
  const filters = filterSplit[2]?.split(',');

  if (filterSplit[0]?.includes('.'))
    return innerFilters(
      filterSplit[0]?.split('.'),
      Between(filters[0], filters[1]),
    );

  return { [filterSplit[0]]: Between(filters[0], filters[1]) };
};

const whereConditions = (filterParam: string) => {
  const filterSplit = (filterParam || '')?.split(':');
  const filterOperation = filterSplit[1];
  switch (filterOperation) {
    case 'eq':
      return equalFilter(filterSplit);
    case '!eq':
      return equalFilter(filterSplit, false);
    case 'btn':
      return betweenFilter(filterSplit);
    case 'in':
      return getInFilter(filterSplit);
    case 'gt':
      return greaterThan(filterSplit);
    case 'ls':
      return lessThan(filterSplit);
    case 'like':
      return likeFilter(filterSplit);
    case 'ilike':
      return ilikeFilter(filterSplit);
    case '!ilike':
      return ilikeFilter(filterSplit, false);
    case '!in':
      return { [filterSplit[0]]: Not(getInFilterArray(filterSplit[2])) };
    default:
      return null;
  }
};

export const relations = (fields: any, metaData: EntityMetadata): any => {
  if (fields) {
    return getRelations(fields?.split(','), metaData);
  }
  return [];
};
export const select = (fields: any, metaData: EntityMetadata): any => {
  verifyFields(fields);
  const splittedFields = [...new Set([...fields?.split(','), 'created', 'id'])];
  if (splittedFields.includes('*')) return {};
  return sortFields(splittedFields, metaData);
};

const getORFIlter = (
  filters: any[],
  payload?: GetOneReqInterface | GetManyReqInterface,
): any[] => {
  if (!payload.include) return filters;
  let propsToInclude = [];
  if (!Array.isArray(payload.include)) {
    propsToInclude = [payload.include];
  } else {
    propsToInclude = payload.include;
  }
  propsToInclude = [...new Set([...propsToInclude])];
  for (const include of propsToInclude) {
    let filterInclude = filters?.filter((f) =>
      Object.keys(f)?.includes(include),
    );
    filters = filters?.filter((f) => !Object.keys(f)?.includes(include));
    if (filterInclude?.length > 1) {
      filterInclude = filterInclude.filter((f) => hasIdKey(f));
    }
    if (filterInclude?.length) {
      filters = filters.map((f) => {
        return { ...f, ...mergeFilters(filterInclude, payload) };
      });
    }
  }
  return filters;
};

const userIds = (user: User) => {
  try {
    /*const users = user?.userGroups?.map((userGroup) =>
      userGroup?.users?.map((user) => user.id),
    );
    return users?.flat() ?? [];*/
    user;
    return [];
  } catch (e) {
    Logger.error(e?.message?.toUpperCase(), 'USER GROUPS');
    return [];
  }
};

const mergeFilters = (
  filters: any[],
  payload: GetOneReqInterface | GetManyReqInterface,
) => {
  const sanitizedFilters = {};
  filters.forEach((filter) => {
    Object.keys(filter).forEach((key) => {
      if (sanitizedFilters[key]) {
        sanitizedFilters[key] = { ...sanitizedFilters[key], ...filter[key] };
      } else {
        sanitizedFilters[key] = filter[key];
      }
    });
  });

  if (payload.user && payload.userGroup === 'true') {
    sanitizedFilters['createdBy'] = {
      ...(sanitizedFilters['createdBy'] || {}),
      id: In(userIds(payload.user) as unknown as FindOperator<unknown>),
    };
  }
  return sanitizedFilters;
};

export function getWhereConditions(
  payload: GetOneReqInterface | GetManyReqInterface,
): any {
  /*if (payload?.userGroup === 'true' && !payload?.user?.userGroups?.length) {
    throwError(
      new ForbiddenException(
        'Permission error, please contact the system admin.',
      ),
    );
  }*/
  if (!payload?.filter) {
    if (payload?.userGroup === 'true' && payload?.user) {
      return {
        createdBy: {
          id: In(userIds(payload.user) as unknown as FindOperator<unknown>),
        },
      };
    }
    return null;
  }
  const filterParams = (
    Array.isArray(payload.filter) ? payload.filter : [payload.filter]
  )
    .map((filterParam: string) => whereConditions(filterParam))
    .filter((param) => param);
  return payload.rootJoin === 'OR'
    ? getORFIlter(filterParams, payload)
    : mergeFilters(filterParams, payload);
}
