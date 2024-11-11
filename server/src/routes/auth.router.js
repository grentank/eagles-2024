const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const targetUser = await User.findOne({ where: { email } });
    if (!targetUser) return res.sendStatus(401);

    const isValid = await bcrypt.compare(password, targetUser.hashpass);
    if (!isValid) return res.sendStatus(401);

    const user = targetUser.get();
    delete user.hashpass;

    const { accessToken, refreshToken } = generateTokens({ user });

    res.cookie('refreshToken', refreshToken, cookiesConfig).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, text: 'Ошибка входа' });
  }
});

authRouter.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (password.length < 3) return res.sendStatus(400);

    const hashpass = await bcrypt.hash(password, 10);
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass },
    });
    if (!created) return res.sendStatus(403);

    const user = newUser.get();
    delete user.hashpass;

    const { accessToken, refreshToken } = generateTokens({ user });

    res.cookie('refreshToken', refreshToken, cookiesConfig).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, text: 'Ошибка регистрации' });
  }
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = authRouter;
