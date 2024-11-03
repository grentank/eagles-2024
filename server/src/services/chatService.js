const fs = require('fs');
const path = require('path');
const dbm = require('../../db/models');
const axios = require('axios');

class ChatService {
  #db;

  #client;

  #initPrompt;

  constructor(db, client) {
    this.#db = db;
    this.#client = client;
    this.loadInitPrompt();
  }

  async handleUserMessages(messages) {
    const gptReply = await this.getGPTReply(messages);
    console.dir(gptReply, { depth: null });
    const latestMessage = gptReply?.result?.alternatives[0].message;
    try {
      const result = await this.handleTool(latestMessage.text);
      console.log('Handle tool', result);
      const newGptReply = await this.getGPTReply([
        ...messages,
        // latestMessage,
        {
          role: 'system',
          text: `Расскажи об объекте человечским языком: ${JSON.stringify(result)}`,
        },
      ]);
      return { message: newGptReply?.result?.alternatives[0].message, data: newGptReply };
    } catch (error) {
      console.log(error);
      return { message: latestMessage, data: gptReply };
    }
  }

  async handleTool(reply) {
    const jsonData = JSON.parse(reply.match(/\{.*\}/s)[0]);
    // if (jsonData.role !== 'tool') throw new Error(`Not a tool\n${JSON.stringify(reply)}`);
    if (jsonData.fn === 'sql_query') {
      console.log('sql_query', jsonData);
      const { query } = jsonData;
      return this.sqlQuery(query);
    }
    if (jsonData.fn === 'reset_pass') {
      console.log('reset_pass', jsonData);
      return { result: 'SUCCESS' };
    }
    throw new Error(`Неверная функция fn: ${jsonData.fn}`);
  }

  getGPTReply(messages) {
    return this.#client
      .post(
        'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
        {
          modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt/rc`,
          completionOptions: {
            stream: false,
            temperature: 0.5,
            maxTokens: '30000',
          },
          messages: [
            {
              role: 'system',
              text: this.#initPrompt,
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
      )
      .then((res) => res.data);
  }

  async loadInitPrompt() {
    const initPromptPath = path.join(__dirname, 'initPrompt.txt');
    this.#initPrompt = await fs.readFileSync(initPromptPath, 'utf8');
  }

  async sqlQuery(query) {
    try {
      console.log('SQL query:', query);
      const [data, meta] = await this.#db.sequelize.query(query);
      console.log('SQL result:', data, meta);
      return {
        result: 'SUCCESS',
        data: data.map(({ id, name, price, description }) => ({
          id,
          name,
          price,
          description,
        }))[0],
      };
    } catch (error) {
      console.log(error);
      return { result: 'ERROR', data: error.message };
    }
  }
}

const chatService = new ChatService(dbm, axios);

module.exports = chatService;
