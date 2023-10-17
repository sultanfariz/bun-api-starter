const { Router } = require('express');
import { register, login } from '../controllers/authController';
import { auth } from '../infrastructure/commons/middlewares/jwt';

const router = Router();

// auth
router.post('/register', auth, register);
router.post('/login', login);

export default router;
