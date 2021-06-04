import { FileUpload } from './../file-upload.interface';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export class FileUploadByS3 implements FileUpload {
  downloadVideo(url: string) {
    throw new Error('Method not implemented.');
  }

  getVideoByRange(startTime: string, endTime: any) {
    throw new Error('Method not implemented.');
  }

  /**
   * upload single file to AWS S3
   * @param file
   */
  async uploadVideo(file: Express.Multer.File) {
    const fileType = file.originalname.split('.').pop();
    const fileName = new Date().getTime();
    const urlKey = `${process.env.AWS_S3_FOLDER}/${fileName}.${fileType}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: urlKey,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };
    const uploadPromise =
      file.size <= 6000000
        ? s3.upload({ ...params, Body: file.buffer }).promise()
        : this.uploadMultiplePart(file, params);

    return uploadPromise;
  }

  /**
   * upload file with multiple parts to AWS S3
   * @param file
   */
  async uploadMultiplePart(file: Express.Multer.File, multiPartParams: any) {
    let partNum = 0;
    const partSize = 1024 * 1024 * 5; // 5MB
    const multipartMap = {
      Parts: [],
    };

    return s3
      .createMultipartUpload(multiPartParams)
      .promise()
      .then(async (multipart) => {
        const partParams = [];
        for (let start = 0; start < file.buffer.length; start += partSize) {
          partNum++;
          const end = Math.min(start + partSize, file.buffer.length);

          partParams.push({
            Body: file.buffer.slice(start, end),
            Bucket: multiPartParams.Bucket,
            Key: multiPartParams.Key,
            PartNumber: String(partNum),
            UploadId: multipart.UploadId,
          });
        }

        const uploadPartPromises = partParams.map(async (partParam) => {
          await s3
            .uploadPart(partParam)
            .promise()
            .then((partData) => {
              multipartMap.Parts[partParam.PartNumber - 1] = {
                ETag: partData.ETag,
                PartNumber: Number(partParam.PartNumber),
              };
            });
        });

        await Promise.all(uploadPartPromises);
        const doneParams = {
          Bucket: multiPartParams.Bucket,
          Key: multiPartParams.Key,
          MultipartUpload: multipartMap,
          UploadId: multipart.UploadId,
        };

        return s3.completeMultipartUpload(doneParams).promise();
      });
  }
}