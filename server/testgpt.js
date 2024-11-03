require('dotenv').config();
const axios = require('axios');
const db = require('./db/models');

const data = {
  modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt-lite`,
  completionOptions: {
    stream: false,
    temperature: 0.6,
    maxTokens: '2000',
  },
  messages: [
    {
      role: 'system',
      text: 'Найди ошибки в тексте и исправь их',
    },
    {
      role: 'user',
      text: 'Ламинат подойдет для укладке на кухне или в детской комнате – он не боиться влаги и механических повреждений благодаря защитному слою из облицованных меламиновых пленок толщиной 0,2 мм и обработанным воском замкам.',
    },
  ],
};

// axios
//   .post('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', data, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.IAM_TOKEN}`,
//     },
//   })
//   .then((res) => console.dir(res.data, { depth: null }));

db.sequelize.query('DELETE FROM "Products" WHERE "id"=4;').then((res) => {
  console.log('results:', res);
});
db.Product.findOne({ where: { id: 4 } }).then(console.log);
// db.Product.destroy({
//   where: {
//     id: 4,
//   },
// }).then((res) => {
//   console.log('results:', res);
// });
