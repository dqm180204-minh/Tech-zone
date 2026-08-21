import express from 'express';
import { login, register, getAllUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);

export default router;
