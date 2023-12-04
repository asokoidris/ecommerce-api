import mongoose from 'mongoose';
import { ProductSpecificationModel } from '../models/index';

/**
 * @fileOverview ProductSpecificationRepository class for ProductSpecification-related database operations.
 */
export default class ProductSpecificationRepo {
  /**
   * @description Create a new ProductSpecification in the database.
   * @param {Object} data - ProductSpecification data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async createProductSpecification(data) {
    return ProductSpecificationModel.create(data);
  }

  /**
   * @description Find a ProductSpecification by their name.
   * @param {string} name - The name to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the ProductSpecification object if found, or null if not found.
   */
  static async findProductSpecificationByName(name) {
    return ProductSpecificationModel.findOne({ name });
  }

  /**
   * @description Update a ProductSpecification's data in the database.
   * @param {string} ProductSpecificationId - The ID of the ProductSpecification to update.
   * @param {Object} updatedData - The updated ProductSpecification data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated ProductSpecification object if found, or null if not found.
   */
  static async updateProductSpecification(ProductSpecificationId, updatedData) {
    return ProductSpecificationModel.findByIdAndUpdate(
      ProductSpecificationId,
      updatedData,
      {
        new: true,
      }
    );
  }

  /**
   * @description Delete a user from the database by their ID.
   * @param {string} ProductSpecificationId - The ID of the ProductSpecification to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted user object if found, or null if not found.
   */
  static async deleteProductSpecification(ProductSpecificationId) {
    return ProductSpecificationModel.findByIdAndDelete(ProductSpecificationId);
  }

  /**
   * @description Retrieve a list of all categories in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all categories objects.
   */
  static async getAllCategories() {
    return ProductSpecificationModel.find({
      status: ProductSpecification_OR_SUBProductSpecification_STATUS.ACTIVE,
    });
  }

  /**
   * @description Find a ProductSpecification by their unique ID.
   * @param {string} ProductSpecificationId - The ID of the ProductSpecification to find.
   * @returns {Promise<Object|null>} A promise that resolves with the  ProductSpecification object if found, or null if not found.
   */
  static async findProductSpecificationById(ProductSpecificationId) {
    return ProductSpecificationModel.findById(ProductSpecificationId);
  }

  /**
   * @description Create a new subProductSpecification in the database.
   * @param {Object} data - SubProductSpecification data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created subProductSpecification object.
   */
  static async createSubProductSpecification(data) {
    return SubProductSpecificationModel.create(data);
  }

  /**
   * @description Find a subProductSpecification by their name.
   * @param {string} name - The name to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the subProductSpecification object if found, or null if not found.
   */
  static async findSubProductSpecificationByName(name) {
    return SubProductSpecificationModel.findOne({ name });
  }

  /**
   * @description Find a subProductSpecification by their unique ID.
   * @param {string} subProductSpecificationId - The ID of the subProductSpecification to find.
   * @returns {Promise<Object|null>} A promise that resolves with the subProductSpecification object if found, or null if not found.
   */
  static async findSubProductSpecificationById(subProductSpecificationId) {
    return SubProductSpecificationModel.findById(subProductSpecificationId);
  }

  /**
   * @description Update a subProductSpecification's data in the database.
   * @param {string} subProductSpecificationId - The ID of the subProductSpecification to update.
   * @param {Object} updatedData - The updated subProductSpecification data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated subProductSpecification object if found, or null if not found.
   */
  static async updateSubProductSpecification(
    subProductSpecificationId,
    updatedData
  ) {
    return SubProductSpecificationModel.findByIdAndUpdate(
      { _id: subProductSpecificationId },
      updatedData,
      { new: true }
    );
  }

  /**
   * @description Delete a subProductSpecification from the database by their ID.
   * @param {string} subProductSpecificationId - The ID of the subProductSpecification to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted subProductSpecification object if found, or null if not found.
   */
  static async deleteSubProductSpecification(subProductSpecificationId) {
    return SubProductSpecificationModel.findOneAndUpdate(
      { _id: subProductSpecificationId },
      {
        status: ProductSpecification_OR_SUBProductSpecification_STATUS.DELETED,
      },
      { new: true }
    );
  }

  /**
   * @description Retrieve a list of all subcategories in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all subProductSpecification objects.
   */
  static async getAllSubCategories() {
    return SubProductSpecificationModel.find({
      status: ProductSpecification_OR_SUBProductSpecification_STATUS.ACTIVE,
    });
  }

  /**
   * @description Find a ProductSpecification by its unique ID and retrieve associated subcategories.
   * @param {string} ProductSpecificationId - The ID of the ProductSpecification to find.
   * @returns {Promise<Object|null>} A promise that resolves with the ProductSpecification and its associated subcategories.
   */
  static findProductSpecificationWithSubcategoriesById(ProductSpecificationId) {
    return ProductSpecificationModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(ProductSpecificationId) },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'ProductSpecificationIds',
          as: 'subcategories',
        },
      },
    ]);
  }

  /**
   * @description Retrieve all active categories and their associated subcategories.
   * @returns {Promise<Array>} A promise that resolves with an array of categories and their subcategories.
   */
  static async getAllCategoriesWithSubcategories() {
    return ProductSpecificationModel.aggregate([
      {
        $match: {
          status: ProductSpecification_OR_SUBProductSpecification_STATUS.ACTIVE,
        },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'ProductSpecificationIds',
          as: 'subcategories',
        },
      },
    ]);
  }

  /**
   * @description Find a ProductSpecification by slug.
   * @param {string} slug - The slug to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the ProductSpecification object if found, or null if not found.
   */
  static async findProductSpecificationBySlug(slug) {
    return ProductSpecificationModel.findOne({ slug });
  }

  /**
   * @description Find a subProductSpecification by slug.
   * @param {string} slug - The slug to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the subProductSpecification object if found, or null if not found.
   */
  static async findSubProductSpecificationBySlug(slug) {
    return SubProductSpecificationModel.findOne({ slug });
  }

  /**
   * @description Retrieve a list of all active subcategories in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all active subProductSpecification objects.
   */
  static async findProductSpecificationByIds(ProductSpecificationIds) {
    return ProductSpecificationModel.find({
      _id: { $in: ProductSpecificationIds },
      status: ProductSpecification_OR_SUBProductSpecification_STATUS.ACTIVE,
    });
  }

  /**
   * @description Retrieve a list of all active subcategories in the database by slug.
   * @returns {Promise<Array>} A promise that resolves with an array of all active subProductSpecification objects.
   */
  static async findProductSpecificationWithSubcategoriesBySlug(slug) {
    return ProductSpecificationModel.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'ProductSpecificationIds',
          as: 'subcategories',
        },
      },
    ]);
  }
}
