/* eslint-disable linebreak-style */
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    meal_id: DataTypes.INTEGER,
    meal_name: DataTypes.STRING,
    meal_price: DataTypes.INTEGER,
    meal_image: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    meal_total: DataTypes.INTEGER,
  }, {});
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  };
  return OrderItem;
};
