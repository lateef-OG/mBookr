import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import checkAuth from '../middleware/check-auth';
// import CheckAuth from '../middleware/check-auth';

const router = Router();
router.post('/', checkAuth.customer, OrderController.create);
router.get('/', checkAuth.caterer, OrderController.fetchOrders);
router.get('/:orderId', checkAuth.all, OrderController.fetchSingleOrder);
router.get('/customer/:customerId', checkAuth.all, OrderController.fetchCustomerOrders);
router.put('/:orderId', checkAuth.all, OrderController.EditOrder);

export default router;
