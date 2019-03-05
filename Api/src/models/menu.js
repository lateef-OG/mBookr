/* eslint-disable linebreak-style */
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    menu_id: DataTypes.INTEGER,
    meal_id: DataTypes.INTEGER,
    meal_name: DataTypes.STRING,
    meal_price: DataTypes.STRING,
    meal_image: DataTypes.STRING,
    date: DataTypes.DATE,
  }, {});
  Menu.associate = () => {
    // associations can be defined here
  };
  return Menu;
};
