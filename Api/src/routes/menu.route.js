import { Router } from 'express';
import MenuController from '../controllers/menu.controller';
import CheckAuth from '../middleware/check-auth';

const router = Router();
router.get('/', CheckAuth.all, MenuController.fetchMenu);
router.post('/', CheckAuth.caterer, MenuController.addMeal);
router.delete('/', CheckAuth.caterer, MenuController.deleteMeal);
router.delete('/:menu_id', CheckAuth.caterer, MenuController.deleteMenu);

export default router;
