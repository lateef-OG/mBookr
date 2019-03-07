import { Router } from 'express';
import multer from 'multer';
import mealController from '../controllers/meal.controller';
import CheckAuth from '../middleware/check-auth';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();
router.post('/', CheckAuth.caterer, upload.single('image'), mealController.createMeal);
router.get('/', CheckAuth.caterer, mealController.fetchMeals);
router.put('/:meal_id', CheckAuth.caterer, upload.single('image'), mealController.editMeal);
router.delete('/:meal_id', CheckAuth.caterer, mealController.deleteMeal);

router.get('/error', mealController.serverError);

export default router;
