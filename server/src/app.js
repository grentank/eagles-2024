const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const messagesRouter = require('./routes/messagesRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
