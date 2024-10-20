'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {}
  }
  Message.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
