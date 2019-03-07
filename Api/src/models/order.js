/* eslint-disable linebreak-style */
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_phone: DataTypes.STRING,
    user_address: DataTypes.STRING,
    order_total: DataTypes.INTEGER,
  }, {});
  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems',
    });
  };
  return Order;
};
