import OrderService from '../services/orders.service';

const OrderController = {
  getOrders(req, res) {
    const orders = OrderService.getOrders();
    return res.status(200).json({
      status: 'success',
      data: orders,
    });
  },
  addOrder(req, res) {
    /*
      Expect json of format
      {
        'customer_name: 'customer_name'
        'customer_id: 'customer_id'
        'meal_order: 'meal_order'
        'address: 'address'
        'phone_no: 'phone_no'
        'total_cost: 'total_cost'
      }
    */
    const order = req.body;
    const createdOrder = OrderService.addOrder(order);
    return res.status(201).json({
      status: 'success',
      data: createdOrder,
    });
  },
  editOrder(req, res) {
    /*
      Expect json of format
      {
        'customer_name: 'customer_name'
        'customer_id: 'customer_id'
        'meal_order: 'meal_order'
        'address: 'address'
        'phone_no: 'phone_no'
        'total_cost: 'total_cost'
      }
    */
    const { id } = req.params;
    const entry = req.body;
    const result = OrderService.editOrder(id, entry);
    let response = {};
    let status = 0;
    if (result.idExists) {
      response = {
        ...response,
        status: 'success',
        message: `Order with id: ${id} edited successfully.`,
        data: result.editedOrder,
      };
      status = 200;
    } else {
      response = {
        ...response,
        status: 'error',
        message: `Order with id: ${id} not found.`,
      };
      status = 404;
    }
    return res.status(status).json({
      response,
    });
  },
};

export default OrderController;
