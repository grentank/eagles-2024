'use strict';

const { Message, User } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      { name: 'Alex', email: 'alex@mail.com', hashpass: '123' },
      { name: 'Bob', email: 'bob@mail.com', hashpass: '123' },
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
  },

  async down(queryInterface, Sequelize) {
    await Message.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  },
};
