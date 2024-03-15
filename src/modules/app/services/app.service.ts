import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { rename } from 'fs/promises';
import * as jszip from 'jszip';
import {
  SYSTEMPATH,
  FileInterface,
  TEMPFILES,
  Menu,
  User,
} from '@app/opensync';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}
  create = async (file: FileInterface, user: User) => {
    const zip = readFileSync(file.path);
    const contents = await new jszip().loadAsync(zip);
    if (Object.keys(contents.files).includes('index.html')) {
      await this.renameFrontEnd('client', 'client-old');
      return await this.unzip(contents.files, 'client', user);
    }
    return { status: false, error: 'Missing entry point' };
  };

  deleteTemp = (filename?: string, destination?: string): void => {
    try {
      unlinkSync(destination ?? `${TEMPFILES}/${filename}`);
    } catch (e) {}
  };

  throwError = (exception: any) => {
    throw exception;
  };

  renameFrontEnd = async (
    appName: string,
    newName: string,
    createNew = true,
  ) => {
    try {
      if (existsSync(`${SYSTEMPATH}/${newName}`)) {
        this.deleteFolder(`${SYSTEMPATH}/${newName}`);
      }
      if (existsSync(`${SYSTEMPATH}/${appName}`)) {
        await rename(`${SYSTEMPATH}/${appName}`, `${SYSTEMPATH}/${newName}`);
      }

      if (createNew) {
        mkdirSync(`${SYSTEMPATH}/${appName}`);
      }
    } catch (e) {}
  };

  private unzip = async (files: any, appName: string, user: User) => {
    try {
      const keys = Object.keys(files);
      for (const key of keys) {
        await this.createFiles(files[key], appName);
      }
      this.addMenu(user);
      return { status: true, message: 'App updated' };
    } catch (e) {
      this.deleteFolder(`${SYSTEMPATH}/${appName}`);
      await this.renameFrontEnd(`${appName}-old`, appName);
      this.throwError(new BadRequestException(e.message));
    }
  };

  private deleteFolder = (path: string) => {
    try {
      rmSync(path, { recursive: true, force: true });
    } catch (e) {}
  };

  private createFiles = async (file: any, appName: string) => {
    const location = `${SYSTEMPATH}/${appName}`;
    try {
      if (file.dir || file.name?.includes('/')) {
        await this.createFolders(file, location);
      } else {
        writeFileSync(
          `${location}/${file.name}`,
          Buffer.from(await file.async('arraybuffer')),
        );
      }
    } catch (e) {
      this.throwError(new BadRequestException(e.message));
    }
  };

  private createFolders = async (file: any, path: string) => {
    const files = file.name.split('/');
    if (files.length === 2) {
      await this.createSingleFile(file, files[0], path);
    } else {
      await this.createRecursiveFiles(file, files, path);
    }
  };

  private createRecursiveFiles = async (
    file: any,
    files: string[],
    path: string,
  ) => {
    try {
      files.pop();
      let folder = '';
      files.forEach((dir) => {
        folder = `${folder}/${dir}`;
        this.createFolder(folder, path);
      });
    } catch (e) {}
    const buffer = await file.async('arraybuffer');
    writeFileSync(`${path}/${file.name}`, Buffer.from(buffer));
  };

  private createFolder = (folder: string, path: string) => {
    try {
      mkdirSync(`${path}${folder}`);
    } catch (e) {}
  };

  private createSingleFile = async (
    file: any,
    folder: string,
    path: string,
  ) => {
    try {
      mkdirSync(`${path}/${folder}`);
    } catch (e) {}

    const buffer = await file.async('arraybuffer');
    writeFileSync(`${path}/${file.name}`, Buffer.from(buffer));
  };

  private addMenu = async (user: User) => {
    Logger.debug('CHECK MENU', 'APP MENU');
    try {
      const manifest = JSON.parse(
        readFileSync(`${SYSTEMPATH}/client/manifest.webapp`, 'utf8'),
      );
      if (manifest?.menus && Array.isArray(manifest.menus)) {
        await this.createMenu(manifest.menus, user);
      }
    } catch (e) {}
  };

  private createMenu = async (menus: Menu[], user: User): Promise<void> => {
    for (const menu of menus) {
      const existingMenu = await this.menuRepository.findOne({
        where: { name: menu.name },
      });
      if (!existingMenu) {
        Logger.debug(
          `ADDING NEW MENU ${menu.name || menu.displayName}`,
          'APP MENU',
        );
        await this.menuRepository.save({ ...menu, createdBy: { id: user.id } });
      }
    }
  };
}