"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../services/menu.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuController = {
  getMenu: function getMenu(req, res) {
    var menu = _menu.default.getMenu();

    return res.status(200).json({
      status: 'success',
      data: menu
    });
  },
  addMenu: function addMenu(req, res) {
    /*
      Expect json of format
      {
        'date': '21st March, 2018',
        'menu': {
            sample menu
        }
      }
    */
    var menu = req.body;

    var newMenu = _menu.default.addMenu(menu);

    return res.status(201).json({
      status: 'success',
      message: 'Menu created successfully',
      data: newMenu
    });
  }
};
var _default = MenuController;
exports.default = _default;