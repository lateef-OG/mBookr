import express from 'express';
import MealService from '../services/meals.service';

const mealService = new MealService();

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).send(mealService.getAll());
});

export default router;
