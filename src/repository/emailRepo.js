import { EmailModel } from '../models/index';

/**
 * @fileOverview UserRepo class for user-related database operations.
 */
export default class EmailRepo {
  /**
   * @description find an email by notification type.
   * @param {string} type - the type of email to be queried.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async findByEmailByNotificationType(type) {
    return EmailModel.findOne({ notificationType: type });
  }

  /**
   * @description Update email verification.
   * @param {Object} find - the object to be queried.
   * @param {Object} data - the object to be updated.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async updateEmailVerification(find, data) {
    return EmailModel.findOneAndUpdate(find, data, { new: true });
  }

  /**
   * @description Create email verification.
   * @param {Object} data - the object to be created.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async create(data) {
    return EmailModel.create(data);
  }
}
