import { FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import { Request, Response } from 'express';
import { FileInterface } from './file.interface';
import { User } from '../entities';

export interface ErrorResponse {
  status: number;
  error: string;
  success?: boolean;
  id?: string;
}

export interface ResponseInterfance {
  status: (arg0: any) => {
    (): any;
    new (): any;
    send: {
      (arg0: any): any;
      new (): any;
    };
  };
}

export interface GetManyInterface {
  fields: string;
  rest: boolean;
  page: number;
  pageSize: number;
}
export interface GetOneInterface {
  fields: FindOptionsSelect<any>;
  rest: boolean;
  id: string;
  relations?: null | FindOptionsRelations<any>;
}
export interface CreateEntityInterface {
  fields: string;
  rest: boolean;
  data: unknown | Record<string, unknown>;
}

export interface PagerInterface {
  page: number;
  pageSize: number;
}

export interface DeleteReqInterface {
  id: string;
  key: string;
}
export interface DeleteResInterface {
  message: string;
}

export interface SaveInterface {
  data: any;
  selections: FindOptionsSelect<any>;
  relations?: null | FindOptionsRelations<any>;
}

export interface findOneOrFailInterface {
  select: FindOptionsSelect<any>;
  id: string;
  relations: null | FindOptionsRelations<any>;
}

export interface GetManyResInterface {
  payload: any[];
  total: number;
  page: number;
  pageSize: number;
  status?: number;
}
export interface GetManyReqInterface {
  fields?: string;
  filter?: string;
  order?: string;
  include?: string;
  page?: number;
  pageSize?: number;
  user: User;
  name?: string;
  rootJoin: 'AND' | 'OR' | null;
  userGroup?: string;
}
export interface GetManySanitized {
  payload: GetManyReqInterface;
  roles?: string[];
}
export interface GetOneReqInterface {
  id: string;
  fields?: string;
  include?: string;
  filter?: string;
  rootJoin?: 'AND' | 'OR' | null;
  user?: User;
  userGroup?: string;
}
export interface RunProcessInterface {
  code: string;
  payload?: any;
  params?: any;
}

export interface FileUploadResponse {
  path: string;
  message: string;
}

export interface BulkyReason {
  identifier: string;
  reason: string;
}

export interface DataImportPayload {
  file: FileInterface;
  filters: string | string[];
  user: User;
  query: any;
}

export interface ImportSummary {
  updated: number;
  added: number;
  failed: number;
  reasons: BulkyReason[];
}

export interface ShehiaBaseline {
  shehia: string;
  no_of_household: number | string;
  population_size: number | string;
}

export interface ErrorMessageResponse {
  message: string;
  status?: number;
  errors?: BulkyReason[];
}

export interface LogDetails {
  type: 'LOG' | 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
  id: string;
  code?: number;
  time?: string;
  context?: string;
}

export interface CronInterface {
  body: any;
  res: Response;
  req: Request;
}

export interface ContainerDetails {
  weight: number;
  bags: number;
}
