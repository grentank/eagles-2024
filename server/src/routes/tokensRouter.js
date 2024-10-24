const express = require('express');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

const tokensRouter = express.Router();

tokensRouter.get('/refresh', verifyRefreshToken, (req, res) => {
  try {
    const { user } = res.locals;
    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка выписывания токенов', message: error.message });
  }
});

module.exports = tokensRouter;
