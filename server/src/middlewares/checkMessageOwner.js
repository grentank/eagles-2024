const messageService = require('../services/messageService');

async function checkMessageOwner(req, res, next) {
  try {
    const { messageId } = req.params;
    const targetMessage = await messageService.getOneMessageWhere({ id: messageId }); // Message.findOne({ where: { id: messageId } });
    if (targetMessage?.userId === res.locals?.user?.id) return next();
    console.log(
      'Invalid owner check',
      JSON.stringify({ targetMessage, user: res.locals?.user }),
    );
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: error.message });
  }
}

module.exports = checkMessageOwner;
