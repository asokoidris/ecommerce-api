import { ProductModel } from '../models/index';

/**
 * @fileOverview ProductRepo class for Product-related database operations.
 */
export default class ProductRepo {
  /**
   * @description Create a new Product in the database.
   * @param {Object} data - Product data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created Product object.
   */
  static async createProduct(data) {
    return ProductModel.create(data);
  }

  /**
   * @description Find a Product by their name address.
   * @param {string} name - The name address to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the Product object if found, or null if not found.
   */
  static async findProductByName(name) {
    return ProductModel.findOne({ name });
  }

  /**
   * @description Update a Product's data in the database.
   * @param {string} ProductId - The ID of the Product to update.
   * @param {Object} updatedData - The updated Product data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated Product object if found, or null if not found.
   */
  static updateProduct(productId, updatedData) {
    try {
      return ProductModel.findByIdAndUpdate({ _id: productId }, updatedData, {
        new: true,
      });
    } catch (error) {
      logger.error(
        `ProductRepo updateProduct database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Delete a Product from the database by their ID.
   * @param {string} ProductId - The ID of the Product to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted Product object if found, or null if not found.
   */
  static deleteProduct(productId) {
    try {
      return ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      logger.error(
        `ProductRepo deleteProduct database -> error: ${error.message}`
      );
      throw error;
    }
  }

  static findProductById(productId) {
    try {
      return ProductModel.findById(productId);
    } catch (error) {
      logger.error(
        `ProductRepo findProductById database -> error: ${error.message}`
      );
      throw error;
    }
  }
  /**
   * @description Retrieve a list of all Products in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all Product objects.
   */
  static async getAllProducts() {
    try {
      const Products = await ProductModel.find();
      return Products;
    } catch (error) {
      logger.error(
        `ProductRepo getAllProducts database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Find a Product by their unique ID and optionally populate related models.
   * @param {string} ProductId - The ID of the Product to find.
   * @param {boolean} lean - Whether to return a plain JavaScript object instead of a Mongoose document.
   * @param {string[]} populate - An array of populate options for mongoose.
   * @returns {Promise<Object|null>} A promise that resolves with the Product object if found, or null if not found.
   */
  static async findProductById(productId, lean = false, populate = []) {
    try {
      let query = ProductModel.findById(productId);

      populate.forEach((pop) => {
        query = query.populate(pop);
      });

      if (lean) {
        query = query.lean();
      }

      const Product = await query;

      if (Product && lean) {
        Product.id = Product._id;
      }

      return Product;
    } catch (error) {
      logger.error(
        `ProductRepo findProductById database -> error: ${error.message}`
      );
      throw error;
    }
  }
}
