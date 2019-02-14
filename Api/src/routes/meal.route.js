import { Router } from 'express';
import MealController from '../controllers/meal.controller';

const router = Router();
router.get('/', MealController.fetchAllMeals);
router.post('/', MealController.addMeal);
router.get('/:id', MealController.getMeal);
router.delete('/:id', MealController.deleteMeal);
router.put('/:id', MealController.editMeal);

export default router;
