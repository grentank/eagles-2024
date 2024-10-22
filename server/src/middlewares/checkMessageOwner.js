const { Message } = require('../../db/models');

async function checkMessageOwner(req, res, next) {
  try {
    const { messageId } = req.params;
    const targetMessage = await Message.findOne({ where: { id: messageId } });
    if (targetMessage?.userId === res.locals?.user?.id) return next();
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: error.message });
  }
}

module.exports = checkMessageOwner;
