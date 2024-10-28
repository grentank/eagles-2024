const models = require('../../db/models');

class MessageService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async getAllMessages() {
    const messages = await this.#db.Message.findAll({
      order: [['id', 'DESC']],
      include: this.#db.User,
    });
    return messages;
  }

  async getMessagesWhere(where) {
    const messages = await this.#db.Message.findAll({
      where,
      order: [['id', 'DESC']],
      include: this.#db.User,
    });
    return messages;
  }

  async createMessage(data) {
    const newMessage = await this.#db.Message.create(data);
    const newMessageWithUser = await this.#db.Message.findOne({
      where: { id: newMessage.id },
      include: this.#db.User,
    });
    return newMessageWithUser;
  }

  async editMessage(id, data) {
    const targetMessage = await this.#db.Message.findOne({
      where: { id },
      include: this.#db.User,
    });
    if (!targetMessage) throw new Error('Сообщение не найдено');
    if (data.title) targetMessage.title = data.title;
    if (data.body) targetMessage.body = data.body;
    if (data.img) targetMessage.img = data.img;
    await targetMessage.save();
    return targetMessage;
  }

  async destroyMessage(id) {
    const count = await this.#db.Message.destroy({ where: { id } });
    if (!count) throw new Error('Сообщение не найдено');
    return true;
  }

  getOneMessageWhere(where) {
    return this.#db.Message.findOne({ where, include: this.#db.User });
  }
}

const messageService = new MessageService(models);

module.exports = messageService;
