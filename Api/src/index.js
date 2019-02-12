import express from 'express';
import MealsRoute from './routes/meals';

const app = express();

const PORT = process.env.PORT || 4000;
app.use('/api/v1/meals', MealsRoute);
app.listen(PORT);

export default app;
