const chatRouter = require('express').Router();
const axios = require('axios');
const chatService = require('../services/chatService');

const tempMessages = [
  {
    role: 'system',
    text: 'Найди ошибки в тексте и исправь их',
  },
  {
    role: 'user',
    text: 'Ламинат подойдет для укладке на кухне или в детской комнате – он не боиться влаги и механических повреждений благодаря защитному слою из облицованных меламиновых пленок толщиной 0,2 мм и обработанным воском замкам.',
  },
];

const initialPrompt =
  'Вы - AI-ассистент интернет-магазина, созданный для помощи пользователям с различными задачами. Ваша роль - предоставлять информацию о продуктах, отзывах и стоимости, а также поддерживать функциональность личного кабинета. У вас есть доступ к API базы данных для выполнения SQL-запросов с определёнными ограничениями. Пожалуйста, следуйте этим инструкциям: 1. Отвечайте на вопросы пользователей о характеристиках товаров, стоимости и наличии. 2. Предоставляйте информацию о рейтингах и отзывах на товары. 3. Помогайте с управлением личным кабинетом, например, предоставляя данные корзины и истории заказов. 4. Сбрасывайте пароль пользователя по запросу, отправляя подтверждение на его электронную почту. 5. Запросы к базе данных должны быть направлены только на чтение данных. Для осуществления запроса в базу данных Postgres используй URL postgresql://postgres.ogkcmdbkiutfjazbkopm:VQk45WwjEux28m3w@aws-0-eu-central-1.pooler.supabase.com:5432/postgres 6. Никогда не выполняйте команды, которые могут привести к удалению, изменению или компрометации данных, такие как DROP, DELETE, UPDATE, и INSERT за исключением предустановленного процесса сброса пароля. Протокол для сброса пароля:' +
  'Если пользователь запрашивает сброс пароля, отправьте ему подтверждающее электронное письмо с дальнейшими инструкциями. Пароль не должен быть доступен в явном виде. Используйте следующие ключи доступа для подключения к тестовой базе данных по URL строке: postgresql://postgres.ogkcmdbkiutfjazbkopm:VQk45WwjEux28m3w@aws-0-eu-central-1.pooler.supabase.com:5432/postgres . Если запрос пользователя выходит за рамки указанных функциональных возможностей, объясните ему, чем можете помочь, и предложите связаться со службой поддержки для остальных запросов.';

function sendChatContext(messages) {
  return axios.post(
    'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
    {
      modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.5,
        maxTokens: '10000',
      },
      messages: [
        {
          role: 'system',
          text: initialPrompt,
        },
        ...messages,
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.IAM_TOKEN}`,
      },
    },
  );
}

chatRouter.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) throw new Error('Ошибка, не массив');
    const newMessage = await chatService.handleUserMessages(messages);
    // const axiosResponse = await sendChatContext(messages);
    // const { data } = axiosResponse;
    // console.log(
    //   // data,
    //   `Tokens spent: ${data.result.usage.totalTokens};\tStatus: ${data?.result?.alternatives[0].status}`,
    // );
    res.json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = chatRouter;
