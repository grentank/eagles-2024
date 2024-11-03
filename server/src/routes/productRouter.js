const productRouter = require('express').Router();
const { Product, User, Review } = require('../../db/models');

productRouter.get('/', async (req, res) => {
  const products = await Product.findAll({
    include: {
      model: Review,
      include: {
        model: User,
      },
    },
  });
  const calculatedRating = products.map((product) => {
    const reviews = product.Reviews;
    const rating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = rating / reviews.length;
    return { ...product.get(), rating: averageRating };
  });
  res.json(calculatedRating);
});

module.exports = productRouter;
