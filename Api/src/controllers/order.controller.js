/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */

const {
  Order, OrderItem,
} = require('../models');

const OrderController = {
  create(req, res) {
    return Order
      .create({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        user_address: req.body.user_address,
        order_total: req.body.order_total,
      })
      .then((order) => {
        const meals = req.body.meals.map((meal) => {
          return {
            meal_id: meal.meal_id,
            meal_name: meal.meal_name,
            meal_price: meal.meal_price,
            meal_image: meal.meal_image,
            quantity: meal.quantity,
            meal_total: meal.meal_total,
            orderId: order.id,
          };
        });
        return OrderItem
          .bulkCreate(meals)
          .then(() => res.status(201).json({
            status: 'success',
            message: 'Order created successfully.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  fetchOrders(req, res) {
    return Order
      .findAll({
        include: [{
          model: OrderItem,
          as: 'orderItems',
        }],
      })
      .then(orders => res.status(200).json({
        message: 'Success',
        orders,
      }))
      .catch(error => res.status(400).send(error));
  },
  fetchSingleOrder(req, res) {
    return Order
      .findById(req.params.orderId, {
        include: [{
          model: OrderItem,
          as: 'orderItems',
        }],
      })
      .then((order) => {
        if (!order) {
          return res.status(404).send({
            message: 'Order doesn\'t exist',
          });
        }
        return res.status(200).json({
          message: 'Success',
          order,
        });
      })
      .catch(error => res.status(400).send(error));
  },
  fetchCustomerOrders(req, res) {
    return Order
      .findAll({
        where: {
          user_id: req.params.customerId,
        },
        include: [{
          model: OrderItem,
          as: 'orderItems',
        }],
      })
      .then((orders) => {
        if (!orders) {
          return res.status(404).send({
            message: 'Customer hasn\'t made any order yet',
          });
        }
        return res.status(200).json({
          message: 'Success',
          orders,
        });
      })
      .catch(error => res.status(400).send(error));
  },
  EditOrder(req, res) {
    return Order
      .findById(req.params.orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).send({
            message: 'Order doesn\'t exist',
          });
        }
        return order
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).json({
            message: 'Order updated.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

export default OrderController;
