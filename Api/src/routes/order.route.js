import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();
router.get('/', OrderController.getOrders);
router.post('/', OrderController.addOrder);
router.put('/:id', OrderController.editOrder);

export default router;
