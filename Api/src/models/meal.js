/* eslint-disable linebreak-style */
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
    price: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
  }, {});
  Meal.associate = () => {
    // associations can be defined here
  };
  return Meal;
};
