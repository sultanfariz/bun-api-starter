const { Router } = require('express');
import {
  register,
  login,
  addProfilePhoto,
} from '../controllers/authController';
import { insertAdmin } from '../controllers/adminController';
import { getUsers, getUsersFromSheet } from '../controllers/userController';
import { auth, verifyRole } from '../infrastructure/commons/middlewares/jwt';
import uploadFile from '../infrastructure/commons/middlewares/uploadFile';
import validateBody, {
  userSchema,
  loginSchema,
} from '../infrastructure/transport/validator';

const router = Router();

// auth
router.post('/register', validateBody(userSchema), register);
router.post('/login', validateBody(loginSchema), login);

router.post(
  '/image-upload',
  auth,
  uploadFile().single('image'),
  addProfilePhoto
);

// admin capabilities
router.post(
  '/admin',
  auth,
  verifyRole(['ADMIN']),
  validateBody(userSchema),
  insertAdmin
);
router.get('/users', auth, verifyRole(['ADMIN']), getUsers);
router.get('/users/sheet', auth, verifyRole(['ADMIN']), getUsersFromSheet);

export default router;
