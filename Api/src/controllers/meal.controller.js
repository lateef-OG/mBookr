/* eslint-disable camelcase */
const { Meal } = require('../models');

const MealController = {
  createMeal(req, res) {
    const {
      name,
      price,
    } = req.body;
    let field = [];
    if (!name) {
      field = [...field, { name: 'name field should not be empty' }];
    }
    if (!price) {
      field = [...field, { phone_number: 'phone number field should not be empty' }];
    }
    if (!req.file) {
      field = [...field, { Image: 'Please upload an image' }];
    }
    if (!name || !price || !req.file) {
      return res.status(422).send({
        error: field,
      });
    }
    return Meal.create({
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
    })
      .then(() => res.status(201).json({
        status: 'success',
        message: 'Meal created successfully.',
      }))
      .catch(error => res.status(400).json({
        error: error.message,
      }));
  },
  fetchMeals(req, res) {
    return Meal
      .findAll()
      .then(meals => res.status(200).json({
        message: 'Success',
        data: meals,
      }))
      .catch(error => res.status(400).send(error));
  },
  editMeal(req, res) {
    return Meal
      .findById(req.params.meal_id)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return meal
          .update({
            name: req.body.name || meal.name,
            price: req.body.price || meal.price,
            image: req.file.path || meal.image,
          })
          .then(() => res.status(200).json({
            message: 'Meal successfully updated.',
            data: meal,
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  deleteMeal(req, res) {
    return Meal
      .findById(req.params.meal_id)
      .then((meal) => {
        if (!meal) {
          return res.status(400).send({
            message: 'Meal Not Found',
          });
        }
        return meal
          .destroy()
          .then(() => res.status(200).json({ message: 'Meal deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  serverError() {
    throw new Error('Something went wrong!');
  },
};

export default MealController;
