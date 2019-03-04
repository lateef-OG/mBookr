import { Router } from 'express';
import MealController from '../controllers1/meal.controller';

const router = Router();
router.get('/', MealController.fetchAllMeals);
router.post('/', MealController.addMeal);
router.delete('/:id', MealController.deleteMeal);
router.put('/:id', MealController.editMeal);
router.get('/error', MealController.serverError);

export default router;
