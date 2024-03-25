import {
  BadRequestException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { existsSync, unlinkSync } from 'fs';
import * as nodemailer from 'nodemailer';
import {
  BaseEntity,
  Between,
  EntityMetadata,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  TreeRepository,
} from 'typeorm';
import * as XLSX from 'xlsx';
import {
  APPENV,
  ASSETS,
  DataImportPayload,
  FileInterface,
  Process,
  TEMPFILES,
  Task,
  User,
  compressImage,
  schemaEntities,
} from '../..';
import {
  checkIfValidUUID,
  getWhereConditions,
  relations,
  select,
} from '../../helpers/filters.helper';
import {
  USERAUTHORITIES,
  errorSanitizer,
  messageToUpper,
  sanitizeRequest,
} from '../../helpers/sanitizer.helpert';
import {
  FileUploadResponse,
  GetManyReqInterface,
  GetManySanitized,
  GetOneReqInterface,
  ImportSummary,
  LogDetails,
  RunProcessInterface,
} from '../../interfaces/shared.interface';

export class SharedService<T extends BaseEntity> {
  Entity: EntityTarget<T>;
  constructor(
    protected readonly repository: TreeRepository<T>,
    protected readonly entity: EntityTarget<T>,
  ) {
    this.Entity = this.entity;
  }

  validate = (payload: T) => {
    payload = this.cleanPayload(payload);
    if (payload && Object.keys(payload)?.length > 0) {
      return;
    }
    this.throwGenericError(
      new BadRequestException('At least one field should be filled'),
    );
  };

  save = async (payload: T): Promise<T> => {
    const script = payload['script'];
    const query = payload['query'];
    delete payload['script'];
    delete payload['query'];
    payload = sanitizeRequest(payload, payload['user']);
    payload['script'] = script;
    payload['query'] = query;
    if (payload['update']) {
      return await this.update({
        ...payload,
        updatedBy: { id: payload['user']['id'] },
      });
    }
    return await this.create({
      ...payload,
      createdBy: { id: payload['user']['id'] },
    });
  };

  findOneOrFail = async (payload: GetOneReqInterface): Promise<T> => {
    const AUTHORITIES = USERAUTHORITIES(payload.user);
    if (
      AUTHORITIES?.includes(this.entity['READ']) ||
      AUTHORITIES?.includes('ALL') ||
      this.entity['READ'] === 'ALL'
    ) {
      return await this.findOne(payload);
    }
    this.throwGenericError(
      new UnauthorizedException(
        `You have no permission to view ${this.entity['plural']}`,
      ),
    );
  };
  findOneOrFailInternal = async (payload: GetOneReqInterface): Promise<T> => {
    return await this.repository.findOneOrFail({
      where: {
        ...getWhereConditions(payload),
        [this.checkIfValidUUID(payload.id)]: payload.id,
      } as unknown as FindOptionsWhere<T>,
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
    });
  };
  findOneInternal = async (payload: GetOneReqInterface): Promise<T> => {
    return await this.repository.findOne({
      where: {
        ...getWhereConditions(payload),
        [this.checkIfValidUUID(payload.id)]: payload.id,
      } as unknown as FindOptionsWhere<T>,
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
    });
  };

  getDescendants = async (payload: GetOneReqInterface): Promise<T[]> => {
    const parent = await this.repository.findOneOrFail({
      where: { id: payload.id } as unknown as FindOptionsWhere<T>,
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
    });
    return await this.repository.findDescendants(parent);
  };

  findMany = async (payload: GetManyReqInterface) => {
    const AUTHORITIES = USERAUTHORITIES(payload.user);
    if (
      AUTHORITIES?.includes(this.entity['READ']) ||
      AUTHORITIES?.includes('ALL') ||
      this.entity['READ'] === 'ALL'
    ) {
      return await this.getMany({ payload, roles: AUTHORITIES });
    }
    this.throwGenericError(
      new UnauthorizedException(
        `You have no permission to view ${this.entity['plural']}`,
      ),
    );
  };
  download = async (payload: GetManyReqInterface): Promise<void> => {
    const AUTHORITIES = USERAUTHORITIES(payload.user);
    const data = await this.getMany({ payload, roles: AUTHORITIES });
    const { select, relations, take, skip, order, where } =
      this.getFilters(payload);
    await this.runProcess(
      {
        code: `${this.entity['plural'].toUpperCase()}_DOWNLOAD`,
        params: {
          ...payload,
          select,
          relations,
          take,
          skip,
          order,
          where,
          data,
          XLSX,
          messageToUpper,
          resource: this.Entity['plural'],
        },
      },
      true,
    );
    if (existsSync(`${TEMPFILES}/${payload.name}`)) return;
    await this.awaitDownload(`${TEMPFILES}/${payload.name}`);
  };

  delete = async (id: string, user: User): Promise<any> => {
    const AUTHORITIES = USERAUTHORITIES(user);

    if (
      AUTHORITIES?.includes(this.entity['DELETE']) ||
      AUTHORITIES?.includes('ALL')
    ) {
      await this.repository.findOneOrFail({
        where: { id } as unknown as FindOptionsWhere<T>,
      });
      await this.deleteEntity(id);
      this.runProcess({ code: 'POST_DELETE', params: { user } });
      return {
        message: `${this.repository.metadata.name} deleted successfully`,
      };
    }
    this.throwGenericError(
      new UnauthorizedException(
        `You have no permission to delete ${this.entity['plural']}`,
      ),
    );
  };

  findOne = async (payload: GetOneReqInterface): Promise<T> => {
    return await this.repository.findOneOrFail({
      where: {
        ...getWhereConditions(payload),
        [this.checkIfValidUUID(payload.id)]: payload.id,
      } as unknown as FindOptionsWhere<T>,
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
    });
  };

  getAncestor = async (payload: GetManyReqInterface): Promise<T[]> => {
    return await this.repository.find({
      where: { parent: IsNull() } as unknown as FindOptionsWhere<T>,
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
    });
  };

  getTree = async (): Promise<T> => {
    const ancestor = await this.repository.findTrees();
    return await this.repository.findDescendantsTree(ancestor[0]);
  };

  uploadDp = async (
    file: FileInterface,
    user: User,
  ): Promise<FileUploadResponse> => {
    if (!file) {
      this.throwGenericError(new BadRequestException('Missing file'));
      return;
    }
    const loggedInUser = await this.findOneOrFailInternal({ id: user.id });
    if (loggedInUser['id']) {
      await this.repository.save({
        id: user.id,
        dp: file.filename,
      } as unknown as T);
      compressImage(`${ASSETS}/${user.id}`, file.filename, user?.dp);

      this.deleteFile(`${ASSETS}/${loggedInUser['id']}/${loggedInUser['dp']}`);

      return {
        path: `/api/users/${file.filename}/dps?id=${user.id}`,
        message: 'Profile picture saved successfully',
      };
    }
    this.deleteFile(`${ASSETS}/${user.id}/${file.filename}`);
    this.throwGenericError(
      new NotFoundException(`User with ID ${user.id} could not be found`),
    );
  };

  import = async (payload: DataImportPayload): Promise<any> => {
    const data = this.dataFromXlsx(payload);
    return data;
  };
  asset = async (
    file: FileInterface,
    user: User,
    id: string,
  ): Promise<FileUploadResponse> => {
    if (!file) {
      this.throwGenericError(new BadRequestException('Missing file'));
      return;
    }
    const entity = await this.findOneOrFailInternal({ id });
    if (entity['id']) {
      await this.repository.save({
        id: id,
        assets: file.filename,
        updatedBy: { id: user.id },
      } as unknown as T);
      this.deleteFile(`${ASSETS}/${id}/${entity['assets']}`);

      return {
        path: `/api/${this.entity['plural']}/${file.filename}/assets?id=${id}`,
        message: 'Asset saved successfully',
      };
    }
    this.deleteFile(`${ASSETS}/${id}/${file.filename}`);
    this.throwGenericError(
      new NotFoundException(`Entity with ID ${id} could not be found`),
    );
  };

  throwGenericError = (exception: any) => {
    throw exception;
  };

  getRelations = (fields: string): FindOptionsRelations<T> => {
    const entity: EntityMetadata =
      this.repository.manager.connection.getMetadata(this.Entity);
    return fields ? relations(fields, entity) : [];
  };

  getSelections = (fields: string) => {
    return fields ? select(fields, this.repository.metadata) : {};
  };

  validateBulky = async (payload: any[], user: User) => {
    let summary = { added: 0, updated: 0, failed: 0, reasons: [] };
    for (const data of payload) {
      delete data['created'];
      delete data['updated'];
      delete data['dp'];
      delete data['level'];
      const sanitizedSummary = await this.checkExistingEntity(
        data,
        user,
        summary,
      );
      summary = sanitizedSummary;
    }

    return summary;
  };

  validatePayloadId = (data: object) => {
    return (
      data &&
      data['id'] &&
      checkIfValidUUID(data['id']) &&
      Object.keys(data)?.length > 1
    );
  };

  checkExistingEntity = async (
    payload: T,
    user: User,
    summary: ImportSummary,
  ): Promise<ImportSummary> => {
    const exists = payload['id']
      ? await this.findOneInternal({ id: payload['id'] })
      : null;
    if (exists) {
      return await this.saveFromBulky(
        { ...payload, updatedBy: user },
        true,
        summary,
      );
    }
    const createdPayload = this.repository.create({
      ...payload,
      createdBy: user,
    });
    return await this.saveFromBulky(createdPayload, false, summary);
  };

  toSentence = (property: string): string => {
    const firstCharacter =
      typeof property?.split(' ')[0] === 'string'
        ? property?.split(' ')[0][0].toUpperCase() +
          property?.split(' ')[0].substring(1)
        : null;
    const finalMessage = property?.split(' ');
    finalMessage[0] = firstCharacter ? firstCharacter : '';
    return finalMessage.join(' ');
  };

  dataFromXlsx = (payload: DataImportPayload) => {
    const xlsxData = XLSX.readFile(payload.file.path, { cellDates: true });
    const sheets = xlsxData.Sheets;
    const sheet = xlsxData.Sheets[Object.keys(sheets)[0]];
    return this.cleanData(XLSX.utils.sheet_to_json(sheet), payload);
  };

  cleanData = (data: unknown[], payload: DataImportPayload) => {
    let sanitizedData = [];
    data.forEach((d: { [x: string]: { toString: () => any } }) => {
      const cleanedData = {
        createdBy: { id: payload?.user?.id },
      };
      Object.keys(d).forEach((key) => {
        cleanedData[
          key?.toLocaleLowerCase()?.split(' ').join('').split('number').join('')
        ] = d[key]?.toString();
      });
      sanitizedData = [...sanitizedData, cleanedData];
    });
    return sanitizedData;
  };

  fields = (user: User) => {
    const AUTHORITIES = USERAUTHORITIES(user);
    if (
      AUTHORITIES?.includes(this.entity['READ']) ||
      AUTHORITIES?.includes('ALL') ||
      this.entity['READ'] === 'ALL'
    ) {
      const columns = this.repository.metadata.columns
        .map((field) => {
          if (
            field.type !== 'uuid' &&
            field.propertyName !== 'created' &&
            field.propertyName !== 'updated' &&
            field.propertyName !== 'deleted'
          ) {
            const fieldSort = (field.comment ?? '').split('__');
            return {
              name: field.propertyName,
              mandatory: !field.isNullable && !field.default,
              type: this.getColumnType(field.type.toString()),
              description: fieldSort[0],
              sortOrder: Number(fieldSort[1]),
              options: field?.enum?.map((option) => {
                return {
                  name:
                    option?.toString()?.charAt(0)?.toUpperCase() +
                    option?.toString()?.slice(1)?.toLowerCase(),
                  value: option,
                };
              }),
            };
          }
        })
        .filter((field) => field);
      const columsnWithSort = columns.filter((column) => column.sortOrder);
      const columsnWithoutSort = this.columsWithoutSort(columns);
      return [...columsnWithSort, ...columsnWithoutSort];
    }
    new UnauthorizedException(
      `You have no permission to view ${this.entity['plural']}`,
    );
  };

  private columsWithoutSort = (columns: any[]) => {
    return columns
      .filter((column: { sortOrder: any }) => !column.sortOrder)
      .sort((a: { description: string }, b: { description: string }) => {
        const descriptionA = a.description.toLowerCase();
        const descriptionB = b.description.toLowerCase();
        if (descriptionA < descriptionB) {
          return -1;
        }
        if (descriptionA > descriptionB) {
          return 1;
        }
        return 0;
      })
      .map((column, index) => {
        return { ...column, sortOrder: index };
      });
  };

  private getColumnType = (type: string): string => {
    switch (true) {
      case type.includes('String()'):
        return 'TEXT';

      case type.includes('Boolean()'):
        return 'BOOLEAN';

      case type.includes('Number()'):
        return 'NUMBER';

      case type.includes('timestamp') || type.includes('Date()'):
        return 'DATE';

      case type.includes('json'):
        return 'JSON';

      default:
        return 'TEXT';
    }
  };

  private saveFromBulky = async (
    payload: T,
    update: boolean,
    summary: ImportSummary,
  ): Promise<ImportSummary> => {
    try {
      await this.repository.save(payload);
      this.runPostProcess(payload, update);
      return {
        ...summary,
        updated: this.getValue(update, summary.updated, summary.updated)
          .updated,
        added: this.getValue(update, summary.added, summary.added).added,
      };
    } catch (e) {
      return {
        ...summary,
        reasons: [
          ...summary.reasons,
          { identifier: payload['id'], reason: errorSanitizer(e) },
        ],
      };
    }
  };

  getFilters = (payload: GetManyReqInterface) => {
    return {
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
      where: getWhereConditions(payload),
      skip: payload.pageSize * payload.page,
      take: payload.pageSize,
      order: this.getOrder(payload.order),
    };
  };

  private getValue = (condition: boolean, updated: number, added: number) => {
    return {
      added: !condition ? added + 1 : 0,
      updated: condition ? updated + 1 : 0,
    };
  };
  deleteEntity = async (id: string): Promise<void> => {
    try {
      await this.repository.delete(id);
    } catch (e) {
      this.sanitizeDeleteError(e);
    }
  };

  private sanitizeDeleteError = (e: {
    detail: string;
    table: string;
    message: any;
  }) => {
    if (
      e?.detail?.includes('already exists') ||
      e?.detail?.includes('is still referenced from table')
    ) {
      let message = e?.table?.split('_').join(' ') + ' with';
      message = e?.detail?.replace('Key', message);

      message = message?.includes('is still referenced from table')
        ? `You can not delete ${this.Entity['name'].toLowerCase()} with ${
            e.table || message[0]?.toLowerCase()
          }`
        : message;
      this.throwGenericError(new BadRequestException(message));
    }
    this.throwGenericError(e.message);
  };
  private cleanPayload = (payload: T) => {
    if (!payload) {
      return payload;
    }
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === '' ||
        payload[key] === undefined ||
        payload[key] === null
      ) {
        delete payload[key];
      }
    });
    return payload;
  };

  getMany = async (body: GetManySanitized): Promise<any> => {
    const { payload } = body;
    const [data, total] = await this.repository.findAndCount({
      select: this.getSelections(payload.fields),
      relations: this.getRelations(payload.fields),
      where: getWhereConditions(payload),
      skip: payload.pageSize * payload.page,
      take: payload.pageSize,
      order: this.getOrder(payload.order),
    });
    return {
      page: payload.page + 1,
      total,
      pageSize: payload.pageSize,
      [this.entity['plural']]: data,
    };
  };

  runPostProcess = (payload: T, update: boolean) => {
    if (update) {
      this.runProcess({
        code: 'POST_UPDATE',
        payload,
        params: { user: payload['updatedBy'] },
      });
      this.runProcess({
        code: `POST_${this.entity['plural'].toUpperCase()}_UPDATE`,
        payload,
        params: { user: payload['updatedBy'] },
      });
      return;
    }
    this.runProcess({
      code: 'POST_CREATE',
      payload,
      params: { user: payload['createdBy'] },
    });
    this.runProcess({
      code: `POST_${this.entity['plural'].toUpperCase()}_CREATE`,
      payload,
      params: { user: payload['createdBy'] },
    });
  };

  getOrder = (order: string) => {
    if (!order) return { created: 'DESC' } as unknown as FindOptionsOrder<T>;
    const orderArray = order?.split(':eq:');
    return (orderArray?.length > 0
      ? { [orderArray[0] || 'created']: orderArray[1] || 'DESC' }
      : { created: 'DESC' }) as unknown as FindOptionsOrder<T>;
  };

  create = async (payload: T): Promise<T> => {
    const AUTHORITIES = USERAUTHORITIES(payload['user']);
    delete payload['user'];
    if (
      AUTHORITIES?.includes(this.entity['ADD']) ||
      AUTHORITIES?.includes('ALL')
    ) {
      delete payload['user'];
      return await this.createNewEntity(payload);
    }

    if (this.entity['plural'] === 'users') {
      this.logUserPayload(payload);
    }

    this.throwGenericError(
      new UnauthorizedException(
        `You have no permission to create ${this.entity['plural']}`,
      ),
    );
  };

  update = async (payload: T): Promise<T> => {
    const AUTHORITIES = USERAUTHORITIES(payload['user']);
    if (
      AUTHORITIES?.includes(this.entity['UPDATE']) ||
      AUTHORITIES?.includes('ALL')
    ) {
      return await this.updateEntity(payload);
    }
    this.throwGenericError(
      new UnauthorizedException(
        `You have no permission to update ${this.entity['plural']}`,
      ),
    );
  };

  updateEntity = async (payload: T): Promise<T> => {
    if (this.repository.metadata.tableName === 'organisationunit') {
      delete payload['path'];
    }
    const user = payload['user'];
    const existingRecord = await this.findOneOrFailInternal({
      id: payload['id'],
    });
    this.validateSystemEntity(existingRecord, payload);
    const query = payload['query'];
    delete payload['createdBy'];
    delete payload['user'];
    delete payload['query'];
    const sanitizedPayload = await this.sanitizePayload(payload);
    payload = this.repository.create({
      ...sanitizedPayload,
      updated: new Date().toISOString(),
    });
    await this.repository.save(sanitizedPayload);
    const updatedPayload = await this.findOneOrFailInternal({
      id: payload['id'],
      fields: query.fields,
      filter: query.filters,
    });
    delete updatedPayload['password'];
    this.runProcess({
      code: 'POST_UPDATE',
      payload: { ...updatedPayload, ...payload },
      params: { user },
    });
    this.runProcess({
      code: `POST_${this.entity['plural'].toUpperCase()}_UPDATE`,
      payload: {
        ...updatedPayload,
        ...payload,
      },
      params: { user },
    });
    return updatedPayload;
  };

  createNewEntity = async (payload: T): Promise<T> => {
    const query = payload['query'];
    delete payload['query'];
    const record = this.repository.create(payload);
    let newRecord = await this.repository.save(record);
    newRecord = await this.findOneOrFailInternal({
      id: newRecord['id'],
      fields: query.fields,
      filter: query.filter,
    });
    this.runProcess({
      code: 'POST_CREATE',
      payload: { ...newRecord, ...payload } as T,
      params: { user: payload['createdBy'] },
    });
    this.runProcess({
      code: `POST_${this.entity['plural'].toUpperCase()}_CREATE`,
      payload: {
        ...newRecord,
        ...payload,
      },
      params: { user: payload['createdBy'] },
    });
    return newRecord;
  };

  sanitizePayload = async (payload: T): Promise<T> => {
    if (payload['password'] && payload['password'] !== '') {
      const hashed = await User.getPassword(payload['password']);
      return { ...payload, ...hashed };
    }
    delete payload['password'];
    return payload;
  };

  awaitDownload = async (path: string, count = 0): Promise<void> => {
    Logger.debug(`AWAITING FILE ${path}`, `${count}`);
    if (existsSync(path)) return;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    count++;
    if (count === APPENV.DOWNLOAD_COUNT) return;
    await this.awaitDownload(path, count);
  };

  validateSystemEntity = (existing: any, payload: T): void => {
    if (
      !existing?.active &&
      !Object.keys(payload)?.includes('active') &&
      !USERAUTHORITIES(payload['user']).includes('ALL')
    )
      this.throwGenericError(
        new BadRequestException('You can not update this record'),
      );
  };

  private checkIfValidUUID(identifier: string): 'id' {
    const validId = isUUID(identifier);
    if (validId) return 'id';
    this.throwGenericError(new BadRequestException('ID not valid'));
  }

  private deleteFile = (path: string) => {
    try {
      unlinkSync(path);
    } catch (e) {}
  };

  runProcess = async (
    body: RunProcessInterface,
    download = false,
  ): Promise<void> => {
    const { code, payload, params } = body;
    let process = await Process.findOne({ where: { code } });
    if (!process && download) {
      process = await Process.findOne({ where: { code: 'GENERAL_DOWNLOAD' } });
    }
    if (process) {
      const task = await Task.save({
        name: process.code,
        logs: [
          {
            type: 'INFO',
            message: `${process.code} process started.`,
            time: new Date().toISOString(),
            context: this.entity['plural'].toUpperCase(),
          },
        ],
      });
      try {
        const execute = Function('context', process.script);
        await execute({
          params: this.getParams(process.params),
          query: this.repository?.manager?.query,
          http: fetch,
          id: task.id,
          payload,
          mailer: nodemailer,
          logger: Logger,
          parameters: {
            ...params,
            ...APPENV,
            ...Object.assign(
              {},
              ...schemaEntities.map((schema) => {
                return {
                  [schema.plural]: schema,
                };
              }),
            ),
            auths: USERAUTHORITIES,
            In,
            Between,
            ILike,
            Like,
            Not,
            LessThan,
            LessThanOrEqual,
            MoreThan,
            MoreThanOrEqual,
          },
          formData: new FormData(),
          db: this.entity,
          repository: this.repository,
          log: (logDetails: LogDetails) => {
            this.log(logDetails);
          },
        });
        await Task.save({ id: task.id, status: 'FINISHED' });
      } catch (e) {
        Logger.error(e.message, this.entity['plural'].toUpperCase());
        const currentTask = await Task.findOne({ where: { id: task.id } });
        const logs = [
          ...currentTask.logs,
          {
            type: 'INFO',
            message: e.message,
            time: new Date().toISOString(),
            context: this.entity['plural'].toUpperCase(),
          } as LogDetails,
        ];
        await Task.save({ id: task.id, status: 'ERROR', logs });
      }
    }
  };

  async log(logdetails: LogDetails) {
    try {
      Logger.debug(
        `PROCESS: ${this.entity['plural'].toUpperCase()} - TYPE: ${
          logdetails.type
        } - MESSAGE: ${logdetails.message} `,
        'SYSTEM',
      );
      const task = await Task.findOne({ where: { id: logdetails.id } });
      task.logs.push({
        ...logdetails,
        time: new Date().toISOString(),
        context: this.entity['plural'].toUpperCase(),
      });
      await Task.save(task);
    } catch (e) {
      Logger.error(e.message, 'TASK LOG');
    }
  }

  private getParams = (params: any) => {
    try {
      return Object.assign({}, ...params);
    } catch (e) {
      return {};
    }
  };

  private logUserPayload = (payload: T) => {
    try {
      console.log(JSON.stringify(payload));
    } catch (e) {
      console.log(payload);
    }
  };
}
