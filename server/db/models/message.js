'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Message.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      img: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
