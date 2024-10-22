const { Router } = require('express');
const { Message } = require('../../db/models');
const upload = require('../middlewares/upload');
const removeImage = require('../utils/removeImage');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkMessageOwner = require('../middlewares/checkMessageOwner');
const messagesRouter = Router();

messagesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const messages = await Message.findAll({ order: [['id', 'DESC']] });
      res.json(messages);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщений', message: error.message });
    }
  })
  .post(verifyAccessToken, upload.single('img'), async (req, res) => {
    try {
      const { title, body } = req.body;
      const filename = req.file ? req.file.filename : null;
      const newMessage = await Message.create({
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
  });

messagesRouter.get('/my', verifyAccessToken, async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { userId: res.locals.user.id } });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения сообщения', message: error.message });
  }
});

messagesRouter
  .route('/:messageId')
  .patch(verifyAccessToken, checkMessageOwner, async (req, res) => {
    try {
      const { title, body } = req.body;
      const message = await Message.findByPk(req.params.messageId);
      await message.update({ title, body });
      res.json(message);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка обновления сообщения', message: error.message });
    }
  })
  .delete(verifyAccessToken, checkMessageOwner, async (req, res) => {
    try {
      const message = await Message.findByPk(req.params.messageId);
      //   await removeImage(message.img); // Раскомментируй, чтобы картинки не засоряли память
      await message.destroy();
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ text: 'Ошибка удаления сообщения', message: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const message = await Message.findByPk(req.params.messageId);
      res.json(message);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщения', message: error.message });
    }
  });

messagesRouter
  .route('/:messageId/image')
  .patch(verifyAccessToken, checkMessageOwner, upload.single('img'), async (req, res) => {
    try {
      const oldMessage = await Message.findByPk(req.params.messageId);
      if (req.file) {
        const newFilename = req.file ? req.file.filename : oldMessage.img;
        // await removeImage(oldMessage.img); // раскомментируй, чтобы картинки удалялись
        await oldMessage.update({ img: newFilename });
      }
      res.status(200).json(oldMessage);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка редактирования изображения', message: error.message });
    }
  });

module.exports = messagesRouter;
