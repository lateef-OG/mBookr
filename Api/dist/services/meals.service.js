"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mealData = _interopRequireDefault(require("../data/meal-data"));

var _meals = _interopRequireDefault(require("../models/meals.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MealService = {
  fetchAllMeals: function fetchAllMeals() {
    return _mealData.default.meals.map(function (data) {
      var meal = new _meals.default();
      meal.id = data.id;
      meal.name = data.name;
      meal.price = data.price;
      meal.image = data.image;
      return meal;
    });
  },
  getAll: function getAll() {
    var data = this.fetchAllMeals();
    return data;
  },
  addMeal: function addMeal(meal) {
    var mealLength = _mealData.default.meals.length;
    var lastId = _mealData.default.meals[mealLength - 1].id;
    var id = lastId + 1;

    var newMeal = _objectSpread({
      id: id
    }, meal);

    _mealData.default.meals = [].concat(_toConsumableArray(_mealData.default.meals), [newMeal]);
    return newMeal;
  },
  editMeal: function editMeal(id, mealEntry) {
    var parsedId = parseInt(id, Number);

    var newMealList = _mealData.default.meals.filter(function (meal) {
      return meal.id !== parsedId;
    });

    var idExists = _mealData.default.meals.length !== newMealList.length;
    var editedMeal = {
      id: parsedId,
      name: mealEntry.name,
      price: mealEntry.price,
      image: mealEntry.image
    };

    if (idExists) {
      _mealData.default.meals = [editedMeal].concat(_toConsumableArray(newMealList));
    }

    return {
      editedMeal: editedMeal,
      idExists: idExists
    };
  },
  deleteMeal: function deleteMeal(id) {
    var parsedId = parseInt(id, Number);

    var newMealList = _mealData.default.meals.filter(function (meal) {
      return meal.id !== parsedId;
    });

    var idExists = _mealData.default.meals.length !== newMealList.length;
    _mealData.default.meals = newMealList;
    return idExists;
  }
};
var _default = MealService;
exports.default = _default;