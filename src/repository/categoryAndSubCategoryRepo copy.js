import mongoose from 'mongoose';
import { CategoryModel, SubCategoryModel } from '../models/index';
import { CATEGORY_OR_SUBCATEGORY_STATUS } from '../utils/constant/options';

/**
 * @fileOverview CategoryRepository class for category-related database operations.
 */
export default class CategoryAndSubCategoryRepo {
  /**
   * @description Create a new category in the database.
   * @param {Object} data - category data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async createCategory(data) {
    return CategoryModel.create(data);
  }

  /**
   * @description Find a category by their name.
   * @param {string} name - The name to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the category object if found, or null if not found.
   */
  static async findCategoryByName(name) {
    return CategoryModel.findOne({ name });
  }

  /**
   * @description Update a category's data in the database.
   * @param {string} categoryId - The ID of the category to update.
   * @param {Object} updatedData - The updated category data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated category object if found, or null if not found.
   */
  static async updateCategory(categoryId, updatedData) {
    return CategoryModel.findByIdAndUpdate(categoryId, updatedData, {
      new: true,
    });
  }

  /**
   * @description Delete a user from the database by their ID.
   * @param {string} categoryId - The ID of the category to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted user object if found, or null if not found.
   */
  static async deleteCategory(categoryId) {
    return CategoryModel.findByIdAndDelete(categoryId);
  }

  /**
   * @description Retrieve a list of all categories in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all categories objects.
   */
  static async getAllCategories() {
    return CategoryModel.find({
      status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
    });
  }

  /**
   * @description Find a category by their unique ID.
   * @param {string} categoryId - The ID of the category to find.
   * @returns {Promise<Object|null>} A promise that resolves with the  category object if found, or null if not found.
   */
  static async findCategoryById(categoryId) {
    return CategoryModel.findById(categoryId);
  }

  /**
   * @description Create a new subcategory in the database.
   * @param {Object} data - Subcategory data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created subcategory object.
   */
  static async createSubCategory(data) {
    return SubCategoryModel.create(data);
  }

  /**
   * @description Find a subcategory by their name.
   * @param {string} name - The name to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the subcategory object if found, or null if not found.
   */
  static async findSubCategoryByName(name) {
    return SubCategoryModel.findOne({ name });
  }

  /**
   * @description Find a subcategory by their unique ID.
   * @param {string} subCategoryId - The ID of the subcategory to find.
   * @returns {Promise<Object|null>} A promise that resolves with the subcategory object if found, or null if not found.
   */
  static async findSubCategoryById(subCategoryId) {
    return SubCategoryModel.findById(subCategoryId);
  }

  /**
   * @description Update a subcategory's data in the database.
   * @param {string} subCategoryId - The ID of the subcategory to update.
   * @param {Object} updatedData - The updated subcategory data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated subcategory object if found, or null if not found.
   */
  static async updateSubCategory(subCategoryId, updatedData) {
    return SubCategoryModel.findByIdAndUpdate(
      { _id: subCategoryId },
      updatedData,
      { new: true }
    );
  }

  /**
   * @description Delete a subcategory from the database by their ID.
   * @param {string} subCategoryId - The ID of the subcategory to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted subcategory object if found, or null if not found.
   */
  static async deleteSubCategory(subCategoryId) {
    return SubCategoryModel.findOneAndUpdate(
      { _id: subCategoryId },
      { status: CATEGORY_OR_SUBCATEGORY_STATUS.DELETED },
      { new: true }
    );
  }

  /**
   * @description Retrieve a list of all subcategories in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all subcategory objects.
   */
  static async getAllSubCategories() {
    return SubCategoryModel.find({
      status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
    });
  }

  /**
   * @description Find a category by its unique ID and retrieve associated subcategories.
   * @param {string} categoryId - The ID of the category to find.
   * @returns {Promise<Object|null>} A promise that resolves with the category and its associated subcategories.
   */
  static findCategoryWithSubcategoriesById(categoryId) {
    return CategoryModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(categoryId) },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryIds',
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
    return CategoryModel.aggregate([
      {
        $match: { status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryIds',
          as: 'subcategories',
        },
      },
    ]);
  }

  /**
   * @description Find a category by slug.
   * @param {string} slug - The slug to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the category object if found, or null if not found.
   */
  static async findCategoryBySlug(slug) {
    return CategoryModel.findOne({ slug });
  }

  /**
   * @description Find a subcategory by slug.
   * @param {string} slug - The slug to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the subcategory object if found, or null if not found.
   */
  static async findSubCategoryBySlug(slug) {
    return SubCategoryModel.findOne({ slug });
  }

  /**
   * @description Retrieve a list of all active subcategories in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all active subcategory objects.
   */
  static async findCategoryByIds(categoryIds) {
    return CategoryModel.find({
      _id: { $in: categoryIds },
      status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
    });
  }

  /**
   * @description Retrieve a list of all active subcategories in the database by slug.
   * @returns {Promise<Array>} A promise that resolves with an array of all active subcategory objects.
   */
  static async findCategoryWithSubcategoriesBySlug(slug) {
    return CategoryModel.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryIds',
          as: 'subcategories',
        },
      },
    ]);
  }
}
