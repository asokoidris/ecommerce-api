import { MediaModel } from '../models';

/**
 * @fileOverview MediaRepo class for Media-related database operations.
 */
export default class MediaRepo {
  /**
   * @description Create a new Media in the database.
   * @param {Object} data - Media data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created Media object.
   */
  static async createMedia(data) {
    return MediaModel.create(data);
  }
}
