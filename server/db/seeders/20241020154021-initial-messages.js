'use strict';

const { Message, User, Review, Cart, Product } = require('../models');
const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      { name: 'Alex', email: 'alex@mail.com', hashpass: hashSync('123', 10) },
      { name: 'Bob', email: 'bob@mail.com', hashpass: hashSync('123', 10) },
      { name: 'Carl', email: 'carl@mail.com', hashpass: hashSync('123', 10) },
    ]);

    await Message.bulkCreate([
      {
        title: 'Моя любимая Узи',
        body: 'Моя Узи скончалась вчера; неделю назад ей поставили диагноз — почечная недостаточность. Я купил все необходимые лекарства и даже регулярно водил её к ветеринарам, но этим утром ветеринар позвонил, чтобы сообщить, что она внезапно ушла. Сейчас у меня в сердце невыносимая боль.',
        img: 'uzi.jpeg',
        userId: 1,
      },
      {
        title: 'Снова дома',
        body: 'Ездили в поездку к родителям, и ему оооочень не нравится их дом. Крис вообще не любит переезды, машины и всякое такое. Вы бы видели его, когда вернулись орбатно 😻😻😻 Просто ангел!',
        img: 'home.webp',
        userId: 1,
      },
      { title: 'Жена купил очки для Шейна', body: '', img: 'glasses1.webp', userId: 2 },
      {
        title: 'Правдоподобный рисунок моего Томаса',
        body: '',
        img: 'painted.webp',
        userId: 1,
      },
      {
        title: 'Ещё Шейн',
        body: 'Он даже не сопротивляется носить очки! 😁😁 Смешнуля Шейн',
        img: 'glasses2.webp',
        userId: 2,
      },
      {
        title: 'Сегодня его день рождения - 2 года',
        body: '',
        img: 'birthday.jpeg',
        userId: 2,
      },
    ]);

    const api1 = (
      await fetch('https://fakestoreapi.com/products').then((res) => res.json())
    ).map((d) => ({
      name: d.title,
      description: d.description,
      price: d.price,
      category: d.category,
      image: d.image,
    }));
    const api2 = (
      await fetch('https://api.escuelajs.co/api/v1/products').then((res) => res.json())
    ).map((d) => ({
      name: d.title,
      description: d.description,
      price: d.price,
      category: d.category.name,
      image: d.images[0],
    }));
    await Product.bulkCreate([...api1]).catch(console.log);
    console.log('Products done 1');
    await Product.bulkCreate([...api2]).catch(console.log);
    console.log('Products done 2');
    await Review.bulkCreate([
      { userId: 1, productId: 1, body: 'Хороший товар, но упаковка мятая', rating: 4 },
      {
        userId: 2,
        productId: 2,
        body: 'Отличный товар, рекомендую к покупке',
        rating: 5,
      },
      {
        userId: 3,
        productId: 3,
        body: 'Товар хороший, но доставка была долгой',
        rating: 4,
      },
      { userId: 1, productId: 2, body: 'Ужасный телефон', rating: 1 },
      { userId: 1, productId: 3, body: 'Вкусно поел', rating: 4 },
      { userId: 2, productId: 4, body: 'Красивый товар', rating: 5 },
      { userId: 2, productId: 5, body: 'Супер, купил', rating: 5 },
      { userId: 3, productId: 6, body: 'Купил в подарок', rating: 5 },
      { userId: 3, productId: 7, body: 'Товар не купил', rating: 1 },
      {
        userId: 3,
        productId: 8,
        body: 'Отличный товар, рекомендую к покупке',
        rating: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Message.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  },
};
