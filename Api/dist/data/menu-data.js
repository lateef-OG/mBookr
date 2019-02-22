"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mealData = _interopRequireDefault(require("./meal-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  menu: {
    date: '20th January, 2019',
    meals: _mealData.default.meals
  }
};
exports.default = _default;