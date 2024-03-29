import ProductRepo from '../../../repository/product.js';
import CategoryAndSubCategoryRepo from '../../../repository/categoryAndSubCategoryRepo copy.js';
import ProductSpecificationRepo from '../../../repository/productSpecification.js';
import CompanyRepo from '../../../repository/company.js';
import { PRODUCT_STATUS } from '../utils/constant/options.js';
import HelperFunctions from '../utils/helper-functions.js';

/**
 * @description Product Service
 */
export default class ProductService {
  /**
   * @description function to Create a new Product
   * @param {Object} data - req body object from the Product Controller
   * @return {Object} Returned object
   */

  static async createProductService(user, data) {
    const {
      company,
      name,
      description,
      categoryId,
      subcategoryId,
      price,
      productSpecification,
      status,
      mainImage,
      images,
    } = data;

    const productExist = await ProductRepo.findProductByName({
      owner: user.id || user._id,
      name: HelperFunctions.capitalizeFirstLetter(name),
    });

    if (productExist)
      return {
        statusCode: 409,
        message: 'Product already registered',
      };

    const companyExist = await CompanyRepo.findCompany(company);

    if (!companyExist)
      return {
        statusCode: 404,
        message: 'Company not found',
      };

    const categoryExist = await CategoryAndSubCategoryRepo.findCategoryById(
      categoryId
    );
    if (!categoryExist)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    const subcategory = await CategoryAndSubCategoryRepo.findSubCategoryById(
      subcategoryId
    );

    if (!subcategory)
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };

    const createdSpecification =
      await ProductSpecificationRepo.createProductSpecification(
        productSpecification
      );

    const newProduct = await ProductRepo.createProduct({
      owner: user.id,
      company,
      name: HelperFunctions.capitalizeFirstLetter(name),
      description: HelperFunctions.capitalizeFirstLetter(description),
      categoryId,
      subcategoryId,
      price,
      productSpecification: createdSpecification._id || createdSpecification.id,
      status,
      mainImage,
      images,
    });

    logger.info(
      `createFavouriteItemService -> newProduct: ${JSON.stringify(newProduct)}`
    );

    return {
      statusCode: 201,
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  /**
   * @description function to get all Products
   * @return {Object} Returned object
   */
  // static async getAllProductsService(query) {
  //   const { page = 1, limit = 20 } = query;

  //   const options = {
  //     page: parseInt(page, 10) || 1,
  //     limit: parseInt(limit, 10) || 20,
  //     sort: { createdAt: -1 },
  //     populate: [
  //       { path: 'productSpecification' },
  //       { path: 'company' },
  //       { path: 'categoryId' },
  //       { path: 'subcategoryId' },
  //       { path: 'owner' },
  //     ],
  //   };

  //   const allProducts = await ProductModel.paginate(
  //     {
  //       status: PRODUCT_STATUS.ACTIVE,
  //     },
  //     options
  //   );

  //   logger.info(
  //     `getAllProductsService -> allProducts: ${JSON.stringify(allProducts)}`
  //   );

  //   return {
  //     statusCode: 200,
  //     message: 'All Products retrieved successfully',
  //     data: allProducts,
  //   };
  // }

  /**
   * @description function to get Product by ID
   * @param {string} id - ID of the Product to retrieve
   * @return {Object} Returned object
   */
  static async getProductByIdService(id) {
    const product = await ProductRepo.findProductById({
      _id: id,
      status: PRODUCT_STATUS.ACTIVE,
    })
      .populate('productSpecification')
      .populate('company')
      .populate('categoryId')
      .populate('subcategoryId')
      .populate('owner');

    if (!product)
      return {
        statusCode: 404,
        message: 'Product not found',
      };

    logger.info(`getProductByIdService -> product: ${JSON.stringify(product)}`);

    return {
      statusCode: 200,
      message: 'Product Details retrieved successfully',
      data: product,
    };
  }

  /**
   * @description function to Update a product by id
   * @param {Object} user - req user object from the Product Controller
   * @param {string} id - The id of the product to be updated
   * @param {Object} data - req body object from the Product Controller
   * @return {Object} Returned object
   */
  static async updateProductByIdService(user, id, data) {
    const product = await ProductRepo.findProductById({
      owner: user.id || user._id,
      _id: id,
      status: PRODUCT_STATUS.ACTIVE,
    });

    if (!product)
      return {
        statusCode: 404,
        message: 'Product not found',
      };

    const productExist = await ProductRepo.findProductById({
      owner: user.id || user._id,
      name: HelperFunctions.capitalizeFirstLetter(data.name),
    });

    if (productExist && productExist._id.toString() !== id.toString())
      return {
        statusCode: 409,
        message: 'Product already registered',
      };

    if (data.categoryId) {
      const categoryExist = await CategoryAndSubCategoryRepo.findCategoryById(
        data.categoryId
      );
      if (!categoryExist)
        return {
          statusCode: 404,
          message: 'Category not found',
        };
    }

    if (data.subcategoryId) {
      const subcategoryExist =
        await SubcategoryACategoryAndSubCategoryRepo.findSubCategoryById(
          data.subcategoryId
        );
      if (!subcategoryExist)
        return {
          statusCode: 404,
          message: 'Subcategory not found',
        };
    }

    if (
      product.productSpecification &&
      typeof product.productSpecification === 'object'
    ) {
      const updateProductSpecification =
        await ProductSpecificationRepo.updateProductSpecification(id, {
          ...data,
        });

      logger.info(
        `updateProductByIdService -> updatedProductSpecification: ${JSON.stringify(
          updateProductSpecification
        )}`
      );
    }

    //NOTE: We don't need to update the id
    data.productSpecification = undefined;

    const updatedProduct = await ProductRepo.updateProduct(id, {
      ...data,
    });

    logger.info(
      `updateProductByIdService -> updatedProduct: ${JSON.stringify(
        updatedProduct
      )}`
    );

    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  /**
   * @description function to Delete a product by id
   * @param {Object} user - req user object from the Product Controller
   * @param {string} id - The id of the product to be deleted
   * @return {Object} Returned object
   */
  static async deleteProductByIdService(user, id) {
    const product = await ProductRepo.findProductById({
      owner: user.id || user._id,
      _id: id,
      status: PRODUCT_STATUS.ACTIVE,
    });

    if (!product)
      return {
        statusCode: 404,
        message: 'Product not found or already deleted',
      };

    const deletedProduct = await ProductRepo.updateProduct(id, {
      status: PRODUCT_STATUS.DELETED,
    });

    logger.info(
      `deleteProductByIdService -> deletedProduct: ${JSON.stringify(
        deletedProduct
      )}`
    );

    return {
      statusCode: 200,
      message: 'Product deleted successfully',
    };
  }

  /**
   * @description function to get Products by category
   * @param {string} categoryId - ID of the category to retrieve
   * @return {Object} Returned object
   */
  static async getProductsByCategoryService(categoryId) {
    const products = await ProductRepo.getAllProducts({
      categoryId,
      status: PRODUCT_STATUS.ACTIVE,
    })
      .populate('productSpecification')
      .populate('company')
      .populate('categoryId')
      .populate('subcategoryId')
      .populate('owner');

    logger.info(
      `getProductsByCategoryService -> products: ${JSON.stringify(products)}`
    );

    return {
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  /**
   * @description function to get Products by subcategory
   * @param {string} subcategoryId - ID of the subcategory to retrieve
   * @return {Object} Returned object
   */
  static async getProductsBySubCategoryService(subcategoryId) {
    const products = await ProductRepo.getAllProducts({
      subcategoryId,
      status: PRODUCT_STATUS.ACTIVE,
    })
      .populate('productSpecification')
      .populate('company')
      .populate('categoryId')
      .populate('subcategoryId')
      .populate('owner');

    logger.info(
      `getProductsBySubcategoryService -> products: ${JSON.stringify(products)}`
    );

    return {
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: products,
    };
  }
}
