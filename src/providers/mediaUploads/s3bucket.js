import AWS from 'aws-sdk';
import fs from 'fs';
import keys from '../../config/keys';

const {
  MEDIA: {
    S3_BUCKET_CONFIG: { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME },
    // CONFIG: { MEDIA_PATH },
  },
  EXTERNAL_API: {
    CONFIG: { MAX_RETRY, RETRY_DELAY },
  },
} = keys;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
  bucketName: BUCKET_NAME,
  ACL: 'public-read',
});

// Add this function to your existing code
export const getFileFromS3 = async (fileKey) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
  };

  try {
    const fileData = await s3.getObject(params).promise();
    return fileData.Body; // Return the file data
  } catch (error) {
    console.error(`Failed to fetch file data from S3: ${fileKey}`, error);
    throw error;
  }
};

export const uploadFileToS3 = async (file, retries = MAX_RETRY) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: file.filename,
    ContentType: file.mimetype,
    Body: fs.readFileSync(file.path),
  };

  try {
    const uploadedMedia = await s3.upload(params).promise();
    fs.unlinkSync(file.path);
    logger.info(
      `uploadFileToS3 -> info: File uploaded to S3 successfully ${JSON.stringify(
        uploadedMedia
      )}`
    );

    return {
      eTag: uploadedMedia.ETag,
      serverSideEncryption: uploadedMedia.ServerSideEncryption,
      versionId: uploadedMedia.VersionId,
      key: uploadedMedia.Key,
      location: uploadedMedia.Location,
      bucket: uploadedMedia.Bucket,
      mimeType: file.mimetype,
    };
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return uploadFileToS3(file, retries - 1);
    } else {
      logger.error(
        `uploadFileToS3 -> error: ${error.message} after ${MAX_RETRY} attempts.`
      );
      return false;
    }
  }
};

export const uploadFilesToS3 = async (files, retries = MAX_RETRY) => {
  const uploadPromises = files.map(async (file) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.filename,
      ContentType: file.mimetype,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
    };

    try {
      const uploadFiles = await s3.upload(params).promise();
      return {
        eTag: uploadFiles.ETag,
        serverSideEncryption: uploadFiles.ServerSideEncryption,
        versionId: uploadFiles.VersionId,
        key: uploadFiles.Key,
        location: uploadFiles.Location,
        bucket: uploadFiles.Bucket,
        mimeType: file.mimetype,
      };
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return uploadFilesToS3([file], retries - 1);
      } else {
        logger.error(
          `uploadFilesToS3 -> error: ${error.message} after ${MAX_RETRY} attempts.`
        );
        return false;
      }
    }
  });

  return Promise.all(uploadPromises);
};

export const deleteFileFromS3 = async (fileKey, retries = MAX_RETRY) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
  };

  try {
    await s3.deleteObject(params).promise();
    logger.log(`File deleted successfully: ${fileKey}`);
  } catch (error) {
    if (retries > 0) {
      console.error(`Failed to delete file: ${fileKey}, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return deleteFileFromS3(fileKey, retries - 1);
    } else {
      console.error(
        `Failed to delete file: ${fileKey} after ${MAX_RETRY} attempts.`
      );
      throw error;
    }
  }
};

export const deleteFilesFromS3 = async (fileKeys, retries = MAX_RETRY) => {
  const params = {
    Bucket: BUCKET_NAME,
    Delete: {
      Objects: fileKeys.map((key) => ({ Key: key })),
    },
  };

  try {
    await s3.deleteObjects(params).promise();
    logger.log(`Files deleted successfully: ${fileKeys.join(', ')}`);
  } catch (error) {
    if (retries > 0) {
      console.error(
        `Failed to delete files: ${fileKeys.join(', ')}, retrying...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return deleteFilesFromS3(fileKeys, retries - 1);
    } else {
      logger.error(
        `Failed to delete files: ${fileKeys.join(
          ', '
        )} after ${MAX_RETRY} attempts.`
      );
      throw error;
    }
  }
};
