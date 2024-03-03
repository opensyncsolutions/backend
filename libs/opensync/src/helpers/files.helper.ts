import { readdirSync, statSync, unlinkSync } from 'fs';
import { TEMPFILES } from '../system';

export const deleteFile = (path: string) => {
  try {
    unlinkSync(path);
  } catch (e) {}
};

export const deleteTempFiles = () => {
  const files = readdirSync(TEMPFILES);
  for (const file of files) {
    const minutes =
      (new Date().getTime() -
        new Date(statSync(`${TEMPFILES}/${file}`).ctime).getTime()) /
      (1000 * 60);
    if (minutes > 5 && file.includes('.pdf')) {
      deleteFile(`${TEMPFILES}/${file}`);
    }
    if (minutes > 10 && file.includes('.xlsx')) {
      deleteFile(`${TEMPFILES}/${file}`);
    }
  }
};
