'use strict';

const { Product, User } = require('../models');
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      { name: 'Alex', email: 'alex@mail.com', hashpass: bcrypt.hashSync('123', 10) },
      { name: 'Bob', email: 'bob@mail.com', hashpass: bcrypt.hashSync('123', 10) },
      {
        name: 'Charlie',
        email: 'charlie@mail.com',
        hashpass: bcrypt.hashSync('123', 10),
      },
    ]);

    const products = await fetch('https://dummyjson.com/products').then((r) => r.json());
    await Product.bulkCreate(
      products.products.map((p, ind) => ({
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.images[0],
        userId: (ind % 3) + 1,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
