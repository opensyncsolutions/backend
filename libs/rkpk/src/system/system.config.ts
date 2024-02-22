import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as crypto from 'crypto';
import { OrganisationUnit, User } from '../entities';

const SYSTEMPATH = './files';
export const ASSETS = './files/assets';
export const TEMPFILES = './files/tmp';
export const TEMPLATES = './files/templates';
export const KEYSPATH = `${SYSTEMPATH}/keys`;
export const PUBLIC_KEY = `${KEYSPATH}/public.pem`;
export const PRIVATE_KEY = `${KEYSPATH}/private.pem`;
export const PORT = process.env.PORT || 3000;

const CREATEKEYS = () => {
  if (!existsSync(KEYSPATH)) {
    mkdirSync(KEYSPATH);
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
    writeFileSync(PUBLIC_KEY, Buffer.from(publicKey));
    writeFileSync(PRIVATE_KEY, Buffer.from(privateKey));
    return;
  }
  if (!existsSync(PUBLIC_KEY)) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
    writeFileSync(PUBLIC_KEY, Buffer.from(publicKey));
    writeFileSync(PRIVATE_KEY, Buffer.from(privateKey));
  }
};

export const SYSTEM = async () => {
  if (!existsSync(SYSTEMPATH)) {
    mkdirSync(SYSTEMPATH);
    mkdirSync(KEYSPATH);
  }

  if (!existsSync(KEYSPATH)) {
    mkdirSync(KEYSPATH);
  }

  if (!existsSync(ASSETS)) {
    mkdirSync(ASSETS);
  }

  if (!existsSync(TEMPFILES)) {
    mkdirSync(TEMPFILES);
  }

  if (!existsSync(TEMPLATES)) {
    mkdirSync(TEMPLATES);
  }
  CREATEKEYS();

  await User.createSuperUser({
    id: '6269df23-f8a0-4776-bd89-3015521bc19d',
    name: 'Admin',
    username: 'admin',
    phoneNumber: '123456789',
    email: 'admin@rkpk.com',
    password: '$2b$10$RvNNdflLzhnEFxBFk47XPeGPMRCM.Bqal2A3s0eE45vJejpuvOknC',
    salt: '$2b$10$RvNNdflLzhnEFxBFk47XPe',
    canLogin: true,
  });

  await OrganisationUnit.createTree({
    name: 'Root',
    shortName: 'Root',
    description: 'Root',
    id: '6269df23-f8a0-4776-bd89-3015521bc19d',
    code: '0001-ROOT',
    level: 1,
    createdBy: { id: '6269df23-f8a0-4776-bd89-3015521bc19d' },
  });
};

export const SESSIONTIME = Number(process.env.SESSION_TIME) || 5e8;

export const DB = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dropSchema: process.env.DROP_SCHEMA === 'TRUE' ? true : false,
  logging: false,
  synchronize: process.env.SYNCHRONIZE === 'TRUE',
};

export const APPENV = {
  REDIS_HOST: process.env.REDIS_HOST || 'redis',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  NODE_ENV: (process.env.NODE_ENV ?? 'development') as
    | 'development'
    | 'test'
    | 'production',
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  TEMPFILES: TEMPFILES,
  ASSETS: ASSETS,
  SYSTEMPATH: SYSTEMPATH,
  TEMPLATES: TEMPLATES,
  DOWNLOAD_COUNT: Number(process.env.DOWNLOAD_COUNT || 20),
};
