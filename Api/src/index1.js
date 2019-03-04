import express from 'express';
import bodyParser from 'body-parser';
import MealsRoute from './routes1/meal.route';
import MenuRoute from './routes1/menu.route';
import OrderRoute from './routes1/order.route';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to mBookr API',
  });
});

app.use('/api/v1/meals', MealsRoute);
app.use('/api/v1/menu', MenuRoute);
app.use('/api/v1/orders', OrderRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // res.status(error.status || 500);
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

export default app;
