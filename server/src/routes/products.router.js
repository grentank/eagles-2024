const express = require('express');
const productService = require('../services/product.service');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const productsRouter = express.Router();

productsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, text: 'Ошибка получения товаров' });
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const product = await productService.createProduct(req.body, res.locals.user.id);
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, text: 'Ошибка создания товара' });
    }
  });

productsRouter.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id, 3);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, text: 'Ошибка удаления товара' });
  }
});

module.exports = productsRouter;
