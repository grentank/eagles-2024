const { Router } = require('express');
const upload = require('../middlewares/upload');
// const removeImage = require('../utils/removeImage');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkMessageOwner = require('../middlewares/checkMessageOwner');
const messageController = require('../controllers/messageController');
const messagesRouter = Router();

messagesRouter
  .route('/')
  .get(messageController.getMessages)
  .post(verifyAccessToken, upload.single('img'), messageController.postMessage);

messagesRouter.get('/my', verifyAccessToken, messageController.getMyMessages);

messagesRouter
  .route('/:messageId')
  .patch(verifyAccessToken, checkMessageOwner, messageController.patchMessageText)
  .delete(verifyAccessToken, checkMessageOwner, messageController.deleteMessage)
  .get(messageController.getOneByMessageId);

messagesRouter
  .route('/:messageId/image')
  .patch(
    verifyAccessToken,
    checkMessageOwner,
    upload.single('img'),
    messageController.patchMessageImg,
  );

module.exports = messagesRouter;
