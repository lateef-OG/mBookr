import MealService from '../services/meals.service';

const MealController = {
  fetchAllMeals(req, res) {
    const allMeals = MealService.getAll();
    return res.json({
      status: 'success',
      data: allMeals,
    }).status(200);
  },
  addMeal(req, res) {
    /*
      Expect json of format
      {
        'name': 'sample name',
        'price': '500',
        'image': 'image.png'
      }
    */
    const meal = req.body;
    const createdMeal = MealService.addMeal(meal);
    return res.json({
      status: 'success',
      data: createdMeal,
    }).status(201);
  },
  getMeal(req, res) {
    const { id } = req.params;
    const meal = MealService.getMeal(id);
    return res.json({
      status: 'success',
      data: meal,
    }).status(200);
  },
};

export default MealController;
