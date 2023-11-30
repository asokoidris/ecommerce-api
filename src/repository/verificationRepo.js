import { VerificationModel } from '../models';

/**
 * @fileOverview  verificationRepo - Repository for verification
 */

export default class verificationRepo {
  /**
   * @description Create a new verification in the database.
   * @param {Object} data - verification data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created verification object.
   */
  static async createVerification(data) {
    return VerificationModel.create(data);
  }

  /**
   * @description Find a verification by hashToken.
   * @param {string} hashToken - The hashToken to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the verification object if found, or null if not found.
   */
  static async findVerificationByHashToken(hashToken) {
    return VerificationModel.findOne({ hashToken });
  }

  /**
   * @description Delete a verifications by userId and verificationType.
   * @param {string} userId - The userId of the verifications to delete.
   * @param {string} verificationType - The verificationType of the verifications to delete.
   * @returns {Promise<Object>} A promise that resolves with the deleted verifications object.
   */
  static async deleteVerificationsByUserIdAndVerificationType(
    userId,
    verificationType
  ) {
    return VerificationModel.deleteMany({
      userId,
      verificationType,
    });
  }
  /**
   * @description Find a verification by userId.
   * @param {string} userId - The userId to search for.
   * @returns {Promise<Object|null>}
   */
  static async findVerificationByUserId(userId) {
    return VerificationModel.findById(userId);
  }

  /**
   * @description Find a verification by userId and verificationType.
   * @param {string} userId - The userId to search for.
   * @param {string} verificationType - The verificationType to search for.
   * @returns {Promise<Object|null>}
   */
  static async findVerificationByUserIdAndVerificationType(
    userId,
    verificationType
  ) {
    return VerificationModel.findOne({ userId, verificationType });
  }

  /**
   * @description Delete a verification by id.
   * @param {string} id - The id of the verification to delete.
   * @returns {Promise<Object>} A promise that resolves with the deleted verification object.
   */
  static async deleteVerificationById(id) {
    return VerificationModel.findByIdAndDelete(id);
  }
}
