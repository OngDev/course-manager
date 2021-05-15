import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { VideoService } from './service';
import { VideoCreationDTO } from './dto/create-video.dto';
import { VideoUpdationDTO } from './dto/update-video.dto';
import * as fs from 'fs';
import { Request, Response } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: VideoCreationDTO) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Get(':id/stream')
  streamVideo(
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

      // get video stats (about 61MB)
      const videoPath = 'W:\\Youtube\\VideoResource\\test.mp4';
      const videoSize = fs.statSync(videoPath).size;
      console.log(videoSize);
      // Parse Range
      // Example: "bytes=32324-"
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      // Create headers
      const contentLength = end - start + 1;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // create video read stream for this particular chunk
      const videoStream = fs.createReadStream(videoPath, { start, end });

      // Stream the video chunk to the client
      videoStream.pipe(res);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: VideoUpdationDTO) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
