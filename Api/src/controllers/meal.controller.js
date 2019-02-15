import MealService from '../services/meals.service';

const MealController = {
  fetchAllMeals(req, res) {
    const allMeals = MealService.getAll();
    return res.status(200).json({
      status: 'success',
      data: allMeals,
    });
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
    return res.status(201).json({
      status: 'success',
      data: createdMeal,
    });
  },
  editMeal(req, res) {
    /*
      Expect json of format
      {
        'name': 'sample name',
        'price': '500',
        'image': 'image.png'
      }
    */
    const { id } = req.params;
    const entry = req.body;
    const result = MealService.editMeal(id, entry);
    let response = {};
    let status = 0;
    if (result.idExists) {
      response = {
        ...response,
        status: 'success',
        message: `Meal with id: ${id} edited successfully.`,
        data: result.editedMeal,
      };
      status = 200;
    } else {
      response = {
        ...response,
        status: 'error',
        message: `Meal with id: ${id} not found.`,
      };
      status = 404;
    }
    return res.status(status).json({
      response,
    });
  },
  deleteMeal(req, res) {
    const { id } = req.params;
    const idExists = MealService.deleteMeal(id);
    let response = {};
    let status = 0;
    if (idExists) {
      response = {
        ...response,
        status: 'success',
        message: `Meal with id: ${id} deleted successfully.`,
      };
      status = 200;
    } else {
      response = {
        ...response,
        status: 'error',
        message: `Meal with id: ${id} not found.`,
      };
      status = 404;
    }
    return res.status(status).json({
      response,
    });
  },
};

export default MealController;
