const messageService = require('../services/messageService');

class MessageController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getMessages = async (req, res) => {
    try {
      const messages = await this.#service.getAllMessages();
      res.json(messages);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщений', message: error.message });
    }
  };

  postMessage = async (req, res) => {
    try {
      const { title, body } = req.body;
      const filename = req.file ? req.file.filename : null;
      const newMessage = await this.#service.createMessage({
        title,
        body,
        img: filename,
        userId: res.locals.user.id,
      });
      res.status(201).json(newMessage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ text: 'Ошибка создания сообщения', message: error.message });
    }
  };

  getMyMessages = async (req, res) => {
    try {
      const messages = await this.#service.getMessagesWhere({
        userId: res.locals.user.id,
      });
      res.json(messages);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщения', message: error.message });
    }
  };

  patchMessageText = async (req, res) => {
    try {
      const updatedMessage = await this.#service.editMessage(
        req.params.messageId,
        req.body,
      );
      res.json(updatedMessage);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка обновления сообщения', message: error.message });
    }
  };

  patchMessageImg = async (req, res) => {
    try {
      const newMessage = await this.#service.editMessage(req.params.messageId, {
        img: req.file ? req.file.filename : undefined,
      });
      //   if (req.file) {
      //     const newFilename = req.file ? req.file.filename : oldMessage.img;
      //     // await removeImage(oldMessage.img); // раскомментируй, чтобы картинки удалялись
      //     await oldMessage.update({ img: newFilename });
      //   }
      res.status(200).json(newMessage);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка редактирования изображения', message: error.message });
    }
  };

  deleteMessage = async (req, res) => {
    try {
      await this.#service.destroyMessage(req.params.messageId);
      //   await removeImage(message.img); // Раскомментируй, чтобы картинки не засоряли память
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ text: 'Ошибка удаления сообщения', message: error.message });
    }
  };

  getOneByMessageId = async (req, res) => {
    try {
      const message = await this.#service.getOneMessageWhere({
        id: req.params.messageId,
      });
      res.json(message);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщения', message: error.message });
    }
  };
}

const messageController = new MessageController(messageService);

module.exports = messageController;
