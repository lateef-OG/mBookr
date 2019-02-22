"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meals = _interopRequireDefault(require("../services/meals.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MealController = {
  fetchAllMeals: function fetchAllMeals(req, res) {
    var allMeals = _meals.default.getAll();

    return res.status(200).json({
      status: 'success',
      data: allMeals
    });
  },
  addMeal: function addMeal(req, res) {
    /*
      Expect json of format
      {
        'name': 'sample name',
        'price': '500',
        'image': 'image.png'
      }
    */
    var meal = req.body;

    var createdMeal = _meals.default.addMeal(meal);

    return res.status(201).json({
      status: 'success',
      data: createdMeal
    });
  },
  editMeal: function editMeal(req, res) {
    /*
      Expect json of format
      {
        'name': 'sample name',
        'price': '500',
        'image': 'image.png'
      }
    */
    var id = req.params.id;
    var entry = req.body;

    var result = _meals.default.editMeal(id, entry);

    var response = {};
    var status = 0;

    if (result.idExists) {
      response = _objectSpread({}, response, {
        status: 'success',
        message: "Meal with id: ".concat(id, " edited successfully."),
        data: result.editedMeal
      });
      status = 200;
    } else {
      response = _objectSpread({}, response, {
        status: 'error',
        message: "Meal with id: ".concat(id, " not found.")
      });
      status = 404;
    }

    return res.status(status).json({
      response: response
    });
  },
  deleteMeal: function deleteMeal(req, res) {
    var id = req.params.id;

    var idExists = _meals.default.deleteMeal(id);

    var response = {};
    var status = 0;

    if (idExists) {
      response = _objectSpread({}, response, {
        status: 'success',
        message: "Meal with id: ".concat(id, " deleted successfully.")
      });
      status = 200;
    } else {
      response = _objectSpread({}, response, {
        status: 'error',
        message: "Meal with id: ".concat(id, " not found.")
      });
      status = 404;
    }

    return res.status(status).json({
      response: response
    });
  },
  serverError: function serverError() {
    throw new Error('Something went wrong!');
  }
};
var _default = MealController;
exports.default = _default;