import CategoryAndSubCategoryRepo from '../../../repository/productSpecification';
import SeededRegistryRepo from '../../../repository/seededRegistryRepo';
import { CATEGORY_OR_SUBCATEGORY_STATUS } from '../../../utils/constant/options';
import HelperFunctions from '../../../utils/helperFunctions';
import CategoryAndSubCategoryList from '../../../utils/json/categoryAndSubCategories.json';

/**
 * @description Category Service
 **/
export default class CategoryAndSubCategoryService {
  /**
   * @description Seed categories and their respective subcategories.
   * @description Also updates the registry after seeding.
   * @description Checks for any existing categories or subcategories to avoid duplicates.
   * @description Updates subcategories to include new category relations if needed.
   */
  static async seedCategoriesAndSubCategories() {
    let categorySeededCount = 0;
    let subCategorySeededCount = 0;

    for (let category of CategoryAndSubCategoryList) {
      category.name = HelperFunctions.capitalize(category.name);
      const existingCategory =
        await CategoryAndSubCategoryRepo.findCategoryByName(category.name);

      let currentCategoryId = existingCategory ? existingCategory.id : null;

      if (!existingCategory) {
        const createdCategory = await CategoryAndSubCategoryRepo.createCategory(
          {
            ...category,
            slug: HelperFunctions.slugifyName(category.name),
            status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
          }
        );
        currentCategoryId = createdCategory.id;
        categorySeededCount++;
      }

      for (let subCategory of category.subcategories) {
        const existingSubCategory =
          await CategoryAndSubCategoryRepo.findSubCategoryByName(
            subCategory.name
          );

        if (!existingSubCategory) {
          subCategory.categoryIds = [currentCategoryId];

          await CategoryAndSubCategoryRepo.createSubCategory({
            ...subCategory,
            slug: HelperFunctions.slugifyName(subCategory.name),
            status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
          });
          subCategorySeededCount++;
        } else {
          if (!existingSubCategory.categoryIds.includes(currentCategoryId)) {
            existingSubCategory.categoryIds.push(currentCategoryId);
            await CategoryAndSubCategoryRepo.updateSubCategory(
              existingSubCategory.id,
              {
                categoryIds: existingSubCategory.categoryIds,
              }
            );
          }
        }
      }
    }

    const registry = await SeededRegistryRepo.getSeededRegistryDocument();
    return SeededRegistryRepo.updateSeededRegistryDocument(registry.id, {
      category: true,
      categoryCount: (registry.categoryCount || 0) + categorySeededCount,
      subCategory: true,
      subCategoryCount:
        (registry.subCategoryCount || 0) + subCategorySeededCount,
    });
  }

  /**
   * @description function to create a category
   * @param {Object} data - req body object from the Category Controller
   * @return {Object} Returned object
   **/
  static async createCategoryService(data) {
    const { name, description, status, metrics } = data;

    const existingCategory =
      await CategoryAndSubCategoryRepo.findCategoryByName(
        HelperFunctions.capitalize(name)
      );
    if (existingCategory) {
      return {
        statusCode: 409,
        message: 'Category already exists',
        data: existingCategory,
      };
    }

    const createNewCategory = await CategoryAndSubCategoryRepo.createCategory({
      name: HelperFunctions.capitalize(name),
      description,
      metrics,
      slug: HelperFunctions.slugifyName(name),
      status,
    });

    logger.info(
      `createCategoryService -> newCategory: ${JSON.stringify(
        createNewCategory
      )}`
    );

    return {
      statusCode: 201,
      message: 'Category created successfully',
      data: createNewCategory,
    };
  }

  /**
   * @description function to update a category document
   * @param {String} id - id of the document
   * @param {Object} data - req body object from the Category Controller
   * @return {Object} Returned object
   **/
  static async updateCategoryService(id, data) {
    const { name } = data;

    const categoryExist = await CategoryAndSubCategoryRepo.findCategoryById(id);

    if (!categoryExist)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    if (categoryExist.status === CATEGORY_OR_SUBCATEGORY_STATUS.DELETED)
      return {
        statusCode: 409,
        message: 'Unable to edit category, un-delete or change status',
      };

    const categoryWithName =
      await CategoryAndSubCategoryRepo.findCategoryByName(name);
    if (categoryWithName && categoryWithName._id.toString() !== id.toString()) {
      return {
        statusCode: 409,
        message: 'Category name already taken',
      };
    }

    const updatedCategory = await CategoryAndSubCategoryRepo.updateCategory(
      id,
      {
        ...data,
        slug: HelperFunctions.slugifyName(name),
      }
    );

    return {
      statusCode: 200,
      message: 'Category updated successfully',
      data: updatedCategory,
    };
  }

  /**
   * @description function to delete a category document
   * @param {String} id - id of the document
   * @return {Object} Returned object
   **/
  static async deleteCategoryService(id) {
    const categoryExist = await CategoryAndSubCategoryRepo.findCategoryById(id);

    if (!categoryExist)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    if (categoryExist.status === CATEGORY_OR_SUBCATEGORY_STATUS.DELETED)
      return {
        statusCode: 409,
        message: 'Category already Deleted',
      };

    await CategoryAndSubCategoryRepo.deleteCategory(id);

    return {
      statusCode: 200,
      message: 'Category deleted successfully',
    };
  }

  /**
   * @description function to get all category document
   * @return {Object} Returned object
   **/
  static async getAllCategoriesService() {
    const categorySeededRegistry =
      await SeededRegistryRepo.getSeededRegistryDocument();

    if (
      !categorySeededRegistry.category ||
      categorySeededRegistry.categoryCount < CategoryAndSubCategoryList.length
    )
      await CategoryAndSubCategoryService.seedCategoriesAndSubCategories();

    const categories = await CategoryAndSubCategoryRepo.getAllCategories();

    logger.info(
      `getAllCategoriesService -> categories fetched successfully: ${JSON.stringify(
        categories
      )}`
    );

    return {
      statusCode: 200,
      message: 'Categories fetched successfully',
      data: categories,
    };
  }

  /**
   * @description function to get category document by id
   * @param {String} id - id of the document
   * @return {Object} Returned object
   **/
  static async getCategoryService(id) {
    const category = await CategoryAndSubCategoryRepo.findCategoryById(id);

    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    logger.info(
      `getCategoryService -> category fetched successfully: ${JSON.stringify(
        category
      )}`
    );

    return {
      statusCode: 200,
      message: 'Category fetched successfully',
      data: category,
    };
  }

  /**
   * @description function to get category document by slug
   * @param {String} slug - slug of the document
   * @return {Object} Returned object
   * */
  static async getCategoryBySlugService(slug) {
    const category = await CategoryAndSubCategoryRepo.findCategoryBySlug(
      HelperFunctions.slugifyName(slug)
    );

    if (!category) {
      return {
        statusCode: 404,
        message: 'Category not found',
      };
    }

    return {
      statusCode: 200,
      message: 'Category fetched successfully',
      data: category,
    };
  }

  /**
   * @description function to create a subcategory
   * @param {Object} data - req body object from the SubCategory Controller
   * @return {Object} Returned object
   **/
  static async createSubCategoryService(data) {
    const { name, categoryIds } = data;

    const existingSubCategory =
      await CategoryAndSubCategoryRepo.findSubCategoryByName(
        HelperFunctions.capitalize(name)
      );

    if (existingSubCategory) {
      return {
        statusCode: 409,
        message: 'Subcategory already exists',
        data: existingSubCategory,
      };
    }

    if (!categoryIds || categoryIds.length === 0)
      return {
        statusCode: 400,
        message: 'CategoryIds is required',
      };

    const categoryIdsExist = await CategoryAndSubCategoryRepo.findCategoryByIds(
      categoryIds
    );

    if (!categoryIdsExist || categoryIdsExist.length !== categoryIds.length)
      return {
        statusCode: 400,
        message: 'CategoryIds is does not exist or is invalid',
      };

    const newSubCategory = {
      name: HelperFunctions.capitalize(name),
      description: data.description,
      slug: HelperFunctions.slugifyName(name),
      categoryIds,
      status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
    };

    const createNewSubCategory =
      await CategoryAndSubCategoryRepo.createSubCategory(newSubCategory);

    return {
      statusCode: 201,
      message: 'Subcategory created successfully',
      data: createNewSubCategory,
    };
  }

  /**
   * @description function to update a subcategory document
   * @param {String} id - id of the document
   * @param {Object} data - req body object from the SubCategory Controller
   * @return {Object} Returned object
   **/
  static async updateSubCategoryService(id, data) {
    const existingSubCategory =
      await CategoryAndSubCategoryRepo.findSubCategoryById(id);

    if (!existingSubCategory) {
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };
    }

    const updatedSubCategory =
      await CategoryAndSubCategoryRepo.updateSubCategory(id, {
        ...data,
        slug: HelperFunctions.slugifyName(data.name),
      });

    return {
      statusCode: 200,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory,
    };
  }

  /**
   * @description function to delete a subcategory document
   * @param {String} id - id of the document
   * @return {Object} Returned object
   **/
  static async deleteSubCategoryService(id) {
    const existingSubCategory =
      await CategoryAndSubCategoryRepo.findSubCategoryById(id);

    if (!existingSubCategory) {
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };
    }

    await CategoryAndSubCategoryRepo.deleteSubCategory(id);

    return {
      statusCode: 200,
      message: 'Subcategory deleted successfully',
    };
  }

  /**
   * @description function to get all subcategory documents
   * @return {Object} Returned object
   **/
  static async getAllSubCategoriesService() {
    const categorySeededRegistry =
      await SeededRegistryRepo.getSeededRegistryDocument();

    if (
      !categorySeededRegistry.category ||
      categorySeededRegistry.categoryCount < CategoryAndSubCategoryList.length
    )
      await CategoryAndSubCategoryService.seedCategoriesAndSubCategories();

    const subcategories =
      await CategoryAndSubCategoryRepo.getAllSubCategories();
    return {
      statusCode: 200,
      message: 'Subcategories fetched successfully',
      data: subcategories,
    };
  }

  /**
   * @description function to get a specific subcategory
   * @param {String} id - id of the document
   * @return {Object} Returned object
   **/
  static async getSubCategoryService(id) {
    const subcategory = await CategoryAndSubCategoryRepo.findSubCategoryById(
      id
    );

    if (!subcategory) {
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };
    }

    return {
      statusCode: 200,
      message: 'Subcategory fetched successfully',
      data: subcategory,
    };
  }

  /**
   * @description function to get subcategories of a specific category
   * @param {String} categoryId - id of the category
   * @return {Object} Returned object
   **/
  static async getCategoryWithSubcategoriesService(categoryId) {
    const categorySeededRegistry =
      await SeededRegistryRepo.getSeededRegistryDocument();

    if (
      !categorySeededRegistry.category ||
      categorySeededRegistry.categoryCount < CategoryAndSubCategoryList.length
    )
      await CategoryAndSubCategoryService.seedCategoriesAndSubCategories();

    const categoryWithSubcategories =
      await CategoryAndSubCategoryRepo.findCategoryWithSubcategoriesById(
        categoryId
      );

    if (!categoryWithSubcategories) {
      return {
        statusCode: 404,
        message: 'Category not found',
      };
    }

    return {
      statusCode: 200,
      message: 'Subcategories of category fetched successfully',
      data: categoryWithSubcategories,
    };
  }

  /**
   * @description function to get all categories with their respective subcategories
   * @return {Object} Returned object
   **/
  static async getAllCategoriesWithSubcategoriesService() {
    const categorySeededRegistry =
      await SeededRegistryRepo.getSeededRegistryDocument();

    if (
      !categorySeededRegistry.category ||
      categorySeededRegistry.categoryCount < CategoryAndSubCategoryList.length
    )
      await CategoryAndSubCategoryService.seedCategoriesAndSubCategories();

    const categoriesWithSubcategories =
      await CategoryAndSubCategoryRepo.getAllCategoriesWithSubcategories();
    return {
      statusCode: 200,
      message: 'All categories with subcategories fetched successfully',
      data: categoriesWithSubcategories,
    };
  }

  /**
   * @description function to get a specific category with its respective subcategories by slug
   * @param {String} slug - slug of the category
   * @return {Object} Returned object
   * */
  static async getCategoryWithSubcategoriesBySlugService(slug) {
    const categorySeededRegistry =
      await SeededRegistryRepo.getSeededRegistryDocument();

    if (
      !categorySeededRegistry.category ||
      categorySeededRegistry.categoryCount < CategoryAndSubCategoryList.length
    )
      await CategoryAndSubCategoryService.seedCategoriesAndSubCategories();

    const categoryWithSubcategories =
      await CategoryAndSubCategoryRepo.findCategoryWithSubcategoriesBySlug(
        HelperFunctions.slugifyName(slug)
      );

    if (!categoryWithSubcategories) {
      return {
        statusCode: 404,
        message: 'Category not found',
      };
    }

    return {
      statusCode: 200,
      message: 'Subcategories of category fetched successfully',
      data: categoryWithSubcategories,
    };
  }
}
