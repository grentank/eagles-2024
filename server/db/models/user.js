'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Message, Cart, Review, Product }) {
      this.hasMany(Message, { foreignKey: 'userId' });
      this.belongsToMany(Product, {
        through: Cart,
        otherKey: 'productId',
        foreignKey: 'userId',
        as: 'cart',
      });
      this.hasMany(Review, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      hashpass: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
