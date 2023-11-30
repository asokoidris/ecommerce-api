import { AdminModel } from '../models/index';

/**
 * @fileOverview AdminRepo class for administrative user-related database operations.
 */
export default class AdminRepo {
  /**
   * Create a new administrative user in the database.
   * @param {Object} data - Administrative user data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created administrative user object.
   */
  static async createAdminUser(data) {
    return AdminModel.create(data);
  }

  /**
   * @description Find a admin by either email or phone number.
   * @param {string} email - The email address to search for (optional).
   * @param {string} phone - The phone number to search for (optional).
   * @returns {Promise<Object|null>} A promise that resolves with the admin object if found, or null if not found.
   */
  static async findAdminByEmailOrPhone(email, phone) {
    return AdminModel.findOne({
      $and: [
        {
          $or: [
            { email: { $ne: null, $eq: email } },
            { phone: { $ne: null, $eq: phone } },
          ],
        },
      ],
    });
  }

  /**
   * Find an administrative user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the administrative user object if found, or null if not found.
   */
  static async findAdminUserByEmail(email) {
    return AdminModel.findOne({ email });
  }

  /**
   * Update an administrative user's data in the database.
   * @param {string} userId - The ID of the administrative user to update.
   * @param {Object} updatedData - The updated administrative user data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated administrative user object if found, or null if not found.
   */
  static async updateAdminUser(userId, updatedData) {
    try {
      const adminUser = await AdminModel.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
      );
      return adminUser;
    } catch (error) {
      logger.error(
        `AdminRepo updateAdminUser database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Delete an administrative user from the database by their ID.
   * @param {string} userId - The ID of the administrative user to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted administrative user object if found, or null if not found.
   */
  static async deleteAdminUser(userId) {
    try {
      const adminUser = await AdminModel.findByIdAndDelete(userId);
      return adminUser;
    } catch (error) {
      logger.error(
        `AdminRepo deleteAdminUser database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Retrieve a list of all administrative users in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all administrative user objects.
   */
  static async getAllAdminUsers() {
    try {
      const adminUsers = await AdminModel.find();
      return adminUsers;
    } catch (error) {
      logger.error(
        `AdminRepo getAllAdminUsers database -> error: ${error.message}`
      );
      throw error;
    }
  }
}
