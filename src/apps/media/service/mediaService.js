import MediaRepo from '../../../repository/mediaRepo.js';
import {
  uploadFileToS3,
  uploadFilesToS3,
  deleteFileFromS3,
  deleteFilesFromS3,
} from '../../../providers/mediaUploads/s3bucket.js';

/**
 * @description Media service class
 */
export default class MediaService {
  /**
   * @description function to upload a single file
   * @param {object} file - The file to be uploaded
   * @returns {object} - Returns an object
   */
  static async uploadSingleFileService(file) {
    if (!file)
      return {
        statusCode: 400,
        message: 'No file selected',
      };

    const fileUpload = await uploadFileToS3(file);

    if (!fileUpload)
      return {
        statusCode: 400,
        message: 'Unable to upload file',
      };

    logger.info(
      `uploadSingleFileService -> info: File uploaded successfully ${JSON.stringify(
        fileUpload
      )}`
    );

    const media = await MediaRepo.createMedia({
      eTag: fileUpload.eTag,
      serverSideEncryption: fileUpload.serverSideEncryption,
      versionId: fileUpload.versionId,
      key: fileUpload.key,
      location: fileUpload.location,
      bucket: fileUpload.bucket,
      mimeType: fileUpload.mimeType,
    });

    return {
      statusCode: 201,
      message: 'File uploaded successfully',
      data: media,
    };
  }

  //FIXME - not working
  /**
   * @description function to get all files by admin
   * @param {object} files - to fetch all files
   * @returns {object} - Returns an object
   */
  static async uploadMultipleFilesService(files) {
    if (!files)
      return {
        statusCode: 400,
        message: 'No file selected',
      };

    const uploadFile = await uploadFilesToS3(files);

    if (!uploadFile)
      return {
        statusCode: 400,
        message: 'Unable to upload files',
      };

    logger.info(
      `uploadMultipleFilesService -> info: Files uploaded successfully`
    );

    const media = await Media.bulkCreate(
      uploadFile.map((file) => ({
        eTag: file.eTag,
        serverSideEncryption: file.serverSideEncryption,
        versionId: file.versionId,
        key: file.key,
        location: file.location,
        bucket: file.bucket,
        mimeType: file.mimeType,
      }))
    );

    return {
      statusCode: 201,
      message: 'Files uploaded successfully',
      data: media,
    };
  }
}
