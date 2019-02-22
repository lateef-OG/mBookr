"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _meal = _interopRequireDefault(require("./routes/meal.route"));

var _menu = _interopRequireDefault(require("./routes/menu.route"));

var _order = _interopRequireDefault(require("./routes/order.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to mBookr API'
  });
});
app.use('/api/v1/meals', _meal.default);
app.use('/api/v1/menu', _menu.default);
app.use('/api/v1/orders', _order.default);
app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
}); // eslint-disable-next-line no-unused-vars

app.use(function (error, req, res, next) {
  // res.status(error.status || 500);
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});
var _default = app;
exports.default = _default;