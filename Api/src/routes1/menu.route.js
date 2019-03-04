import { Router } from 'express';
import MenuController from '../controllers1/menu.controller';

const router = Router();
router.get('/', MenuController.getMenu);
router.post('/', MenuController.addMenu);

export default router;
