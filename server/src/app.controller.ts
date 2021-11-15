import { AppService } from './app.service';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomResponse, HttpMessages } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/presignedUrl')
  @HttpCode(HttpStatus.ACCEPTED)
  async createPurchaseDish(
    @Body() fileInfo: { fileName: string },
  ): Promise<{ fileKey: string, uploadUrl: string }> {
    const fileData = await this.appService.presignedUrl(fileInfo.fileName);

    return fileData;
  }
}
