const { Router } = require('express');
import {
  register,
  login,
  addProfilePhoto,
} from '../controllers/authController';
import { auth } from '../infrastructure/commons/middlewares/jwt';
import uploadFile from '../infrastructure/commons/middlewares/uploadFile';

const router = Router();

// auth
router.post('/register', register);
router.post('/login', login);
router.post(
  '/image-upload',
  auth,
  uploadFile().single('image'),
  addProfilePhoto
);

export default router;
