/* eslint-disable camelcase */
import moment from 'moment';

const { Menu, Meal } = require('../models');


const MenuController = {
  addMeal(req, res) {
    const date = new Date();
    const menu_id = parseInt(moment().format('DDMMYYYY'), Number);
    return Meal
      .findById(req.body.meal_id)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return Menu.create({
          menu_id,
          meal_id: meal.id,
          meal_name: meal.name,
          meal_price: meal.price,
          meal_image: meal.image,
          date,
        })
          .then(() => res.status(201).json({
            status: 'success',
            message: 'Meal added successfully.',
          }))
          .catch(error => res.status(400).json({
            error: error.message,
          }));
      })
      .catch(error => res.status(400).send(error));
  },
  fetchMenu(req, res) {
    const date = moment().format('DD-MM-YYYY');
    const menu_id = parseInt(moment().format('DDMMYYYY'), Number);
    return Menu
      .findAll({ where: { menu_id } })
      .then(menu => res.status(200).json({
        message: 'Success',
        date,
        data: menu,
      }))
      .catch(error => res.status(400).send(error));
  },
  deleteMeal(req, res) {
    return Menu
      .findAll({ where: { menu_id: req.body.menu_id, meal_id: req.body.meal_id } })
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return Menu
          .destroy({ where: { menu_id: req.body.menu_id, meal_id: req.body.meal_id } })
          .then(() => res.status(200).json({
            message: 'Meal deleted from menu successfully.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  deleteMenu(req, res) {
    return Menu
      .findAll({ where: { menu_id: req.params.menu_id } })
      .then((menu) => {
        if (!menu) {
          return res.status(400).send({
            message: 'Menu Not Found',
          });
        }
        return Menu
          .destroy({ where: { menu_id: req.params.menu_id } })
          .then(() => res.status(200).json({
            message: 'Menu deleted successfully.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

export default MenuController;
