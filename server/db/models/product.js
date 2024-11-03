'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ User, Review, Cart }) {
      this.belongsToMany(User, {
        through: Cart,
        foreignKey: 'productId',
        otherKey: 'userId',
        as: 'cart',
      });
      this.hasMany(Review, { foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      image: DataTypes.TEXT,
      categoryId: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
