import MealData from '../data/meal-data';
import Meal from '../models/meals.model';

const MealService = {
  fetchAllMeals() {
    return MealData.meals.map((data) => {
      const meal = new Meal();
      meal.id = data.id;
      meal.name = data.name;
      meal.price = data.price;
      meal.image = data.image;
      return meal;
    });
  },

  getAll() {
    const data = this.fetchAllMeals();
    return data;
  },

  addMeal(meal) {
    const mealLength = MealData.meals.length;
    const lastId = MealData.meals[mealLength - 1].id;
    const id = lastId + 1;
    const newMeal = { id, ...meal };
    MealData.meals = [...MealData.meals, newMeal];
    return newMeal;
  },

  editMeal(id, mealEntry) {
    const parsedId = parseInt(id, Number);
    const newMealList = MealData.meals.filter(meal => meal.id !== parsedId);
    const idExists = (MealData.meals.length !== newMealList.length);
    const editedMeal = {
      id: parsedId,
      name: mealEntry.name,
      price: mealEntry.price,
      image: mealEntry.image,
    };
    MealData.meals = [...newMealList, editedMeal];
    return {
      editedMeal,
      idExists,
    };
  },

  deleteMeal(id) {
    const parsedId = parseInt(id, Number);
    const newMealList = MealData.meals.filter(meal => meal.id !== parsedId);
    const idExists = (MealData.meals.length !== newMealList.length);
    MealData.meals = newMealList;
    return idExists;
  },
};

export default MealService;
