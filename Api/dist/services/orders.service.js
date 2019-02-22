"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _orderData = _interopRequireDefault(require("../data/order-data"));

var _orders = _interopRequireDefault(require("../models/orders.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OrderService = {
  fetchOrders: function fetchOrders() {
    return _orderData.default.orders.map(function (data) {
      var order = new _orders.default();
      order.id = data.id;
      order.customer_name = data.customer_name;
      order.customer_id = data.customer_id;
      order.meal_order = data.meal_order;
      order.address = data.address;
      order.phone_no = data.phone_no;
      order.total_cost = data.total_cost;
      return order;
    });
  },
  getOrders: function getOrders() {
    return this.fetchOrders();
  },
  addOrder: function addOrder(order) {
    var ordersLength = _orderData.default.orders.length;
    var lastId = _orderData.default.orders[ordersLength - 1].id;
    var id = lastId + 1;

    var newOrder = _objectSpread({
      id: id
    }, order);

    _orderData.default.orders = [].concat(_toConsumableArray(_orderData.default.orders), [newOrder]);
    return newOrder;
  },
  editOrder: function editOrder(id, orderEntry) {
    var parsedId = parseInt(id, Number);

    var newOrdersList = _orderData.default.orders.filter(function (order) {
      return order.id !== parsedId;
    });

    var idExists = _orderData.default.orders.length !== newOrdersList.length;
    var editedOrder = {
      id: parsedId,
      customer_name: orderEntry.customer_name,
      customer_id: orderEntry.customer_id,
      meal_order: orderEntry.meal_order,
      address: orderEntry.address,
      phone_no: orderEntry.phone_no,
      total_cost: orderEntry.total_cost
    };

    if (idExists) {
      _orderData.default.orders = [editedOrder].concat(_toConsumableArray(newOrdersList));
    }

    return {
      editedOrder: editedOrder,
      idExists: idExists
    };
  }
};
var _default = OrderService;
exports.default = _default;