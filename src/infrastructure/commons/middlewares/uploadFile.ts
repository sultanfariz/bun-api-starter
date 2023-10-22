import * as fs from 'fs';
import * as path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const uploadPath = path.join(
  __dirname,
  '../../../../public/' + process.env.UPLOAD_PATH
);

const storage = (entityPath = ''): multer.StorageEngine => {
  return multer.diskStorage({
    destination: function (_req: any, _file: any, cb: any) {
      const dir = path.join(uploadPath, entityPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      cb(null, dir);
    },
    filename: function (_req: any, file: any, cb: any) {
      cb(null, `${uuidv4() + path.extname(file.originalname)}`);
    },
  });
};

const uploadFile = (entityPath = ''): multer.Multer =>
  multer({
    storage: storage(entityPath),
    limits: {
      fileSize: 1024 * 1024 * 6, // Max file size = 6 MB
    },
  });

export default uploadFile;
