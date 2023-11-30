import MediaService from '../service/mediaService';
import { errorResponse, successResponse } from '../../../utils/response';

/**
 * @description Media controller class
 */
export default class MediaController {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async uploadSingleFileController(req, res) {
    try {
      const { file } = req;
      const result = await MediaService.uploadSingleFileService(file);
      if (result.statusCode == 400)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `uploadSingleFileController -> info: File uploaded successfully`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`uploadSingleFileController -> error: ${error.message}`);
      return errorResponse(res, 500, `Oops! Something went wrong`);
    }
  }

  //FIXME - not working
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async uploadMultipleFilesController(req, res) {
    try {
      const { files } = req;
      const result = await MediaService.uploadMultipleFilesService(files);
      if (result.statusCode == 400)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `uploadMultipleFilesController -> info: Files uploaded successfully`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`uploadMultipleFilesController -> error: ${error.message}`);
      return errorResponse(res, 500, `Oops! Something went wrong`);
    }
  }
}
