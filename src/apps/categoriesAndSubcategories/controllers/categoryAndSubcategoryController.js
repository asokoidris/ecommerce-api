import { errorResponse, successResponse } from '../../../utils/response';
import CategoryAndSubCategoryService from '../services/category-service';
import { errorResponseMessage } from '../../../utils/constant/options';

/**
 * @description Category Controller
 */
class CategoryAndSubCategoryController {
  /**
   * @description Controller for creating a new category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createCategoryController(req, res) {
    try {
      const category =
        await CategoryAndSubCategoryService.createCategoryService(req.body);
      logger.info(
        `createCategoryController -> category: ${JSON.stringify(category)}`
      );

      if (category.statusCode === 409 || category.statusCode === 400)
        return errorResponse(res, category.statusCode, category.message);

      return successResponse(
        res,
        category.statusCode,
        category.message,
        category.data
      );
    } catch (error) {
      logger.error(`createCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating a category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   **/
  static async updateCategoryController(req, res) {
    const { id } = req.params;
    try {
      const result = await CategoryAndSubCategoryService.updateCategoryService(
        id,
        req.body
      );

      logger.info(
        `updateCategoryController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 409 || result.statusCode === 500)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`updateCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for delete a category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   **/
  static async deleteCategoryController(req, res) {
    const { id } = req.params;
    try {
      const result = await CategoryAndSubCategoryService.deleteCategoryService(
        id
      );

      logger.info(
        `deleteCategoryController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(res, result.statusCode, result.message);
    } catch (error) {
      logger.error(`deleteCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Get all categories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the categories data
   **/
  static async getAllCategoriesController(req, res) {
    try {
      const result =
        await CategoryAndSubCategoryService.getAllCategoriesService();

      logger.info(`getAllCategories -> categories: ${JSON.stringify(result)}`);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getAllCategories -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Get single category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the categories data
   **/
  static async getCategoryController(req, res) {
    const { id } = req.params;
    try {
      const result = await CategoryAndSubCategoryService.getCategoryService(id);

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(
        `getCategoryController -> category: ${JSON.stringify(result)}`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Get single category by slug
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the categories data
   * */
  static async getCategoryBySlugController(req, res) {
    const { slug } = req.params;
    try {
      const result =
        await CategoryAndSubCategoryService.getCategoryBySlugService(slug);

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(
        `getCategoryBySlugController -> category: ${JSON.stringify(result)}`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getCategoryBySlugController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for creating a subcategory
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   **/
  static async createSubcategoryController(req, res) {
    try {
      const result =
        await CategoryAndSubCategoryService.createSubCategoryService(req.body);

      if (result.statusCode === 409 || result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `createSubCategoryController -> result: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`createSubCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating a subcategory
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateSubcategoryController(req, res) {
    try {
      const subCategoryId = req.params.id;
      const result =
        await CategoryAndSubCategoryService.updateSubCategoryService(
          subCategoryId,
          req.body
        );
      logger.info(
        `updateSubCategoryController -> result: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`updateSubCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for deleting a subcategory
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async deleteSubcategoryController(req, res) {
    try {
      const subCategoryId = req.params.id;
      const result =
        await CategoryAndSubCategoryService.deleteSubCategoryService(
          subCategoryId
        );
      logger.info(
        `deleteSubCategoryController -> result: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`deleteSubCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a specific subcategory
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getSubCategoryController(req, res) {
    try {
      const subCategoryId = req.params.id; // assuming ID is passed as a URL parameter
      const result = await CategoryAndSubCategoryService.getSubCategoryService(
        subCategoryId
      );
      logger.info(
        `getSubCategoryController -> result: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getSubCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all subcategories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAllSubcategoriesController(req, res) {
    try {
      const result =
        await CategoryAndSubCategoryService.getAllSubCategoriesService();

      logger.info(
        `getAllSubCategoriesController -> result: ${JSON.stringify(result)}`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getAllSubCategoriesController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a specific category and all its subcategories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCategoryWithSubcategoriesController(req, res) {
    try {
      const categoryId = req.params.id;
      const result =
        await CategoryAndSubCategoryService.getCategoryWithSubcategoriesService(
          categoryId
        );

      logger.info(
        `getCategoryWithSubcategoriesController -> result: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `getCategoryWithSubcategoriesController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all categories and their respective subcategories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAllCategoriesWithSubcategoriesController(req, res) {
    try {
      const result =
        await CategoryAndSubCategoryService.getAllCategoriesWithSubcategoriesService();

      logger.info(
        `getAllCategoriesWithSubcategoriesController -> result: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `getAllCategoriesWithSubcategoriesController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a specific category and all its subcategories by slug
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCategoryWithSubcategoriesBySlugController(req, res) {
    try {
      const { slug } = req.params;
      const result =
        await CategoryAndSubCategoryService.getCategoryWithSubcategoriesBySlugService(
          slug
        );

      logger.info(
        `getCategoryWithSubcategoriesBySlugController -> result: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `getCategoryWithSubcategoriesBySlugController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default CategoryAndSubCategoryController;
