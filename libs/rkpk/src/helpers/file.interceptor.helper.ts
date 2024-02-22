import { readFileSync, renameSync, unlinkSync } from 'fs';
import { extname } from 'path';
import * as sharp from 'sharp';
import { generateRandomDigits } from './base.helper';

export const imageFileFilter = (
  req: any,
  file: { originalname: string; mimetype: string },
  callback: (arg0: Error, arg1: boolean) => void,
) => {
  if (!file?.mimetype?.includes('image')) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const filesFilter = (
  req: any,
  file: { originalname: string },
  callback: (arg0: Error, arg1: boolean) => void,
) => {
  if (file.originalname.match(/\.(pdf|doc|docs|docx|txt|text)$/)) {
    return callback(new Error('Document files are are not allowed!'), false);
  }
  callback(null, true);
};
export const csvAndXsxlOnly = (
  req: any,
  file: { originalname: string },
  callback: (arg0: Error, arg1: boolean) => void,
) => {
  if (
    !file.originalname.match(
      /\.(csv|xlsx|xlsm|xlsb|xlt|xltx|xls|xlw|xmlss|xls|excel)$/,
    )
  ) {
    return callback(new Error('Only excel and csv files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (
  req: any,
  file: { originalname: string },
  callback: (arg0: any, arg1: string) => void,
) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(4).fill(null).join('');
  callback(null, `${generateRandomDigits()}${fileExtName}`);
  return randomName;
};

export const editStemFileName = (
  req: any,
  file: { originalname: string },
  callback: (arg0: any, arg1: string) => void,
) => {
  callback(null, generateRandomDigits());
  return generateRandomDigits();
};

export const originalNames = (
  req: any,
  file: { originalname: string },
  callback: (arg0: any, arg1: string) => void,
) => {
  callback(null, file.originalname);
  return file.originalname;
};

const removeOld = ({ path, oldFile }) => {
  try {
    unlinkSync(`${path}/${oldFile}`);
  } catch (e) {}
};

export const compressImage = async (
  path: string,
  fileName: string,
  oldFile: string,
): Promise<void> => {
  const tempName = `${new Date().toISOString()}_${fileName}`;
  try {
    renameSync(`${path}/${fileName}`, `${path}/${tempName}`);
    const image = readFileSync(`${path}/${tempName}`);
    await sharp(image)
      .webp({ quality: 1 })
      .toFile(`${path}/${fileName?.split(extname(fileName))[0]}.webp`);
    unlinkSync(`${path}/${tempName}`);
    removeOld({ path, oldFile });
    renameSync(
      `${path}/${fileName?.split(extname(fileName))[0]}.webp`,
      `${path}/${fileName}`,
    );
  } catch (e) {
    renameSync(`${path}/${tempName}`, `${path}/${fileName}`);
  }
};
