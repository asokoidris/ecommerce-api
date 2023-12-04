import { SeededRegistryModel } from '../models/index';

/**
 * @fileOverview SeededRegistryRepo class for seededRegistry database operations.
 */
export default class SeededRegistryRepo {
  /**
   * @description Fetch the single seeded registry in the database. If it doesn't exist, create it.
   * @returns {Promise<Object>} A promise that resolves with the seeded registry object.
   */
  static async getSeededRegistryDocument() {
    let existingRegistry = await SeededRegistryModel.findOne();

    if (!existingRegistry) {
      existingRegistry = await SeededRegistryModel.create({});
    }

    return existingRegistry;
  }

  /**
   * @description Update the single seeded registry in the database with the provided data. If it doesn't exist, create it.
   * @param {String} id - The ID of the seeded registry document to update.
   * @param {Object} data - Data to be updated.
   * @returns {Promise<Object>} A promise that resolves with the updated seeded registry object.
   */
  static async updateSeededRegistryDocument(id, data) {
    let registry = await SeededRegistryModel.findById(id);

    if (!registry) {
      registry = new SeededRegistryModel({ _id: id, ...data });
    } else {
      for (let key in data) {
        registry[key] = data[key];
      }
    }

    return registry.save();
  }
}
