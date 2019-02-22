"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  orders: [{
    id: 1,
    customer_name: 'customer 1',
    customer_id: 4,
    meal_order: [{
      id: 1,
      name: 'Jollof Rice',
      price: 350,
      quantity: 2,
      total: 700
    }, {
      id: 2,
      name: 'Fried Rice',
      price: 400,
      quantity: 1,
      total: 400
    }],
    address: '20, Sample address, city, state',
    phone_no: '08123456789',
    total_cost: 1100
  }, {
    id: 2,
    customer_name: 'customer 2',
    customer_id: 3,
    meal_order: [{
      id: 1,
      name: 'Jollof Rice',
      price: 350,
      quantity: 1,
      total: 350
    }, {
      id: 3,
      name: 'Pounded Yam and Efo',
      price: 420,
      quantity: 2,
      total: 840
    }],
    address: '20, Sample address, city, state',
    phone_no: '08123456789',
    total_cost: 1190
  }]
};
exports.default = _default;