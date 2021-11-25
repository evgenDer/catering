import * as AWS from 'aws-sdk';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async presignedUrl(fileName: string) {
    try {
      const bucket = await this.configService.get('BUCKET_NAME');
      const region = await this.configService.get('REGION');

      const s3 = new AWS.S3({ region });

      const folder = 'images';
      const fileKey = `${folder}/${fileName}`;
      const fileExtension = fileName.toLowerCase().split('.').pop();

      const uploadUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: bucket,
        Key: fileKey,
        ContentType: `image/${fileExtension}`,
        Expires: 300,
      });

      return {
        uploadUrl,
        fileKey,
      };
    } catch ({ response, message }) {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
