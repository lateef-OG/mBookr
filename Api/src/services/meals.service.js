import Meals from '../data/meal-data';
import Meal from '../models/meals.model';

export default class MealService {
  fetchAllMeals() {
    this.meals = Meals;

    return this.meals.map((data) => {
      const meal = new Meal();
      meal.id = data.id;
      meal.name = data.name;
      meal.price = data.price;
      meal.image = data.image;
      return meal;
    });
  }

  getAll() {
    const data = this.fetchAllMeals();
    return {
      message: 'success',
      data,
    };
  }

  addMeal(meal) {
    this.meals = Meals;

    const mealLength = this.meals.length;
    const lastId = this.meals(mealLength - 1).id;
    const id = lastId + 1;
    const newMeal = { id, ...meal };
    this.meals = [...this.meals, newMeal];
    return meal;
  }

  getMeal(id) {
    this.meals = Meals;
    const mealOption = this.meals.find(meal => meal.id === id);
    return mealOption || {};
  }
}
