"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _orders = _interopRequireDefault(require("../services/orders.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OrderController = {
  getOrders: function getOrders(req, res) {
    var orders = _orders.default.getOrders();

    return res.status(200).json({
      status: 'success',
      data: orders
    });
  },
  addOrder: function addOrder(req, res) {
    /*
      Expect json of format
      {
        'customer_name: 'customer_name'
        'customer_id: 'customer_id'
        'meal_order: 'meal_order'
        'address: 'address'
        'phone_no: 'phone_no'
        'total_cost: 'total_cost'
      }
    */
    var order = req.body;

    var createdOrder = _orders.default.addOrder(order);

    return res.status(201).json({
      status: 'success',
      data: createdOrder
    });
  },
  editOrder: function editOrder(req, res) {
    /*
      Expect json of format
      {
        'customer_name: 'customer_name'
        'customer_id: 'customer_id'
        'meal_order: 'meal_order'
        'address: 'address'
        'phone_no: 'phone_no'
        'total_cost: 'total_cost'
      }
    */
    var id = req.params.id;
    var entry = req.body;

    var result = _orders.default.editOrder(id, entry);

    var response = {};
    var status = 0;

    if (result.idExists) {
      response = _objectSpread({}, response, {
        status: 'success',
        message: "Order with id: ".concat(id, " edited successfully."),
        data: result.editedOrder
      });
      status = 200;
    } else {
      response = _objectSpread({}, response, {
        status: 'error',
        message: "Order with id: ".concat(id, " not found.")
      });
      status = 404;
    }

    return res.status(status).json({
      response: response
    });
  }
};
var _default = OrderController;
exports.default = _default;