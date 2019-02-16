import OrderData from '../data/order-data';
import Order from '../models/orders.model';

const OrderService = {
  fetchOrders() {
    return OrderData.orders.map((data) => {
      const order = new Order();
      order.id = data.id;
      order.customer_name = data.customer_name;
      order.customer_id = data.customer_id;
      order.meal_order = data.meal_order;
      order.address = data.address;
      order.phone_no = data.phone_no;
      order.total_cost = data.total_cost;
      return order;
    });
  },

  getOrders() {
    return this.fetchOrders();
  },

  addOrder(order) {
    const ordersLength = OrderData.orders.length;
    const lastId = OrderData.orders[ordersLength - 1].id;
    const id = lastId + 1;
    const newOrder = { id, ...order };
    OrderData.orders = [...OrderData.orders, newOrder];
    return newOrder;
  },

  editOrder(id, orderEntry) {
    const parsedId = parseInt(id, Number);
    const newOrdersList = OrderData.orders.filter(order => order.id !== parsedId);
    const idExists = (OrderData.orders.length !== newOrdersList.length);
    const editedOrder = {
      id: parsedId,
      customer_name: orderEntry.customer_name,
      customer_id: orderEntry.customer_id,
      meal_order: orderEntry.meal_order,
      address: orderEntry.address,
      phone_no: orderEntry.phone_no,
      total_cost: orderEntry.total_cost,
    };
    OrderData.meals = [...newOrdersList, editedOrder];
    return {
      editedOrder,
      idExists,
    };
  },
};

export default OrderService;
