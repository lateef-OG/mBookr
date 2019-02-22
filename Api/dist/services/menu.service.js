"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menuData = _interopRequireDefault(require("../data/menu-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuService = {
  getMenu: function getMenu() {
    return _menuData.default.menu;
  },
  addMenu: function addMenu(menu) {
    var newMenu = menu;
    _menuData.default.menu = newMenu;
    return newMenu;
  }
};
var _default = MenuService;
exports.default = _default;