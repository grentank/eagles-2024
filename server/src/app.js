const express = require('express');
const morgan = require('morgan');
const path = require('path');
const productsRouter = require('./routes/products.router');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.router');
const tokensRouter = require('./routes/tokens.router');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
