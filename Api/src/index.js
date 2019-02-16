import express from 'express';
import bodyParser from 'body-parser';
import MealsRoute from './routes/meal.route';
import MenuRoute from './routes/menu.route';
import OrderRoute from './routes/order.route';

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

app.use((req, res) => {
  const error = new Error('Not found');
  res.status(404);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
