const models = require('../../db/models');

class ProductService {
  #models;

  // Dependency injection
  constructor(dbModels) {
    this.#models = dbModels;
  }

  getProducts() {
    return this.#models.Product.findAll({
      order: [['id', 'desc']],
      include: this.#models.User,
    });
  }

  async createProduct(data, userId) {
    const newProd = await this.#models.Product.create({ ...data, userId });
    const newProdWithUser = await this.#models.Product.findByPk(newProd.id, {
      include: this.#models.User,
    });
    return newProdWithUser;
  }

  async deleteProduct(productId, userWhoTriesToDeleteId) {
    const res = await this.#models.Product.destroy({
      where: { id: productId, userId: userWhoTriesToDeleteId },
    });
    if (res === 0) throw new Error('Действие запрещено');
    if (res === 1) return true;
    throw new Error('Что-то пошло не так');
  }
}

const productService = new ProductService(models);

module.exports = productService;
