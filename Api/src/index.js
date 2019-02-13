import express from 'express';
import MealsRoute from './routes/meals';

const app = express();

const PORT = process.env.PORT || 4000;
app.use('/api/v1/meals', MealsRoute);
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
app.listen(PORT);

export default app;
