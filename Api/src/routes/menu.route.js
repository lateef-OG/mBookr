import { Router } from 'express';
import MenuController from '../controllers/menu.controller';

const router = Router();
router.get('/', MenuController.fetchMenu);
router.post('/', MenuController.addMeal);
router.delete('/', MenuController.deleteMeal);
router.delete('/:menu_id', MenuController.deleteMenu);

export default router;
