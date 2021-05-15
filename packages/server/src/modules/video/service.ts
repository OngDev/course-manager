import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoCreationDTO } from './dto/create-video.dto';
import { VideoUpdationDTO } from './dto/update-video.dto';
import { Video } from './model';
import * as fs from 'fs';

@Injectable()
export class VideoService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  create(createVideoDto: VideoCreationDTO) {
    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: VideoUpdationDTO) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }

  async getVideoPathById(id: string): Promise<string> {
    try {
      const video = await this.videoRepository.findOne(id);
      if (!video) {
        throw new NotFoundException(`Video with id ${id} is not existed`);
      }
      return video.videoUrl;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  getVideoSizeByPath(path: string): number | undefined {
    try {
      return fs.statSync(path).size;
    } catch (error) {
      this.logger.error(error.message);
      return undefined;
    }
  }

  getVideoStream(path: string, start: number, end: number) {
    try {
      return fs.createReadStream(path, { start, end });
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
