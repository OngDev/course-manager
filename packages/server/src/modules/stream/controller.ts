import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { VideosService } from '../video/service';
import { generateStreamResponseConfig } from './utils';

@Controller('stream')
export class StreamController {
  constructor(
    private readonly videosService: VideosService,
    private readonly logger: Logger,
  ) {}
  @Get(':id')
  async streamVideo(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Ensure there is a range given for the video
      const range = req.headers.range;
      if (!range) {
        throw new BadRequestException('Requires Range header');
      }

      const videoPath = await this.videosService.getVideoPathById(id);
      const videoSize = this.videosService.getVideoSizeByPath(videoPath);
      this.logger.verbose(`Video size: ${videoSize}`);

      const { headers, start, end } = generateStreamResponseConfig(
        range,
        videoSize,
      );

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // create video read stream for this particular chunk
      const videoStream = this.videosService.getVideoStream(
        videoPath,
        start,
        end,
      );

      // Stream the video chunk to the client
      videoStream.pipe(res);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
