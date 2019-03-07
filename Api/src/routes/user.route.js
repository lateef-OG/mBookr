import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);
router.delete('/', UserController.deleteUser);

export default router;
