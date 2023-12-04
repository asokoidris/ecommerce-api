import { CompanyModel } from '../models/index';

/**
 * @fileOverview companyRepo class for company-related database operations.
 */
export default class CompanyRepo {
  /**
   * @description Create a new company in the database.
   * @param {Object} data - company data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created company object.
   */
  static async createCompany(data) {
    return CompanyModel.create(data);
  }

  /**
   * @description Find a company by their name address.
   * @param {string} name - The name address to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the company object if found, or null if not found.
   */
  static async findCompanyByName(name) {
    return CompanyModel.findOne({ name });
  }

  /**
   * @description Update a company's data in the database.
   * @param {string} companyId - The ID of the company to update.
   * @param {Object} updatedData - The updated company data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated company object if found, or null if not found.
   */
  static updateCompany(companyId, updatedData) {
    try {
      return CompanyModel.findByIdAndUpdate({ _id: companyId }, updatedData, {
        new: true,
      });
    } catch (error) {
      logger.error(
        `companyRepo updatecompany database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description find a company from the database by their ID.
   * @param {string} companyId - The ID of the company to find.
   * @returns {Promise<Object|null>} A promise that resolves with the find company object if found, or null if not found.
   */
  static findCompany(companyId) {
    try {
      return CompanyModel.findById(companyId);
    } catch (error) {
      logger.error(
        `companyRepo findcompany database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Delete a company from the database by their ID.
   * @param {string} companyId - The ID of the company to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted company object if found, or null if not found.
   */
  static deleteCompany(companyId) {
    try {
      return CompanyModel.findByIdAndDelete(companyId);
    } catch (error) {
      logger.error(
        `companyRepo deletecompany database -> error: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Retrieve a list of all companys in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all company objects.
   */
  static async getAllCompanys() {
    try {
      const companys = await CompanyModel.find();
      return companys;
    } catch (error) {
      logger.error(
        `companyRepo getAllcompanys database -> error: ${error.message}`
      );
      throw error;
    }
  }
}
