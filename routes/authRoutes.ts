const { Router } = require('express');
import { register, login } from '../controllers/authController';

const router = Router();

// auth
router.post('/register', register);
router.post('/login', login);

export default router;
