import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoCreationDTO } from './dto/create-video.dto';
import { VideoUpdationDTO } from './dto/update-video.dto';
import { Video } from './model';
import { Cache } from 'cache-manager';
import * as fs from 'fs';

@Injectable()
export class VideoService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  create(createVideoDto: VideoCreationDTO): Promise<VideoCreationDTO> {
    try {
      return this.videoRepository.save(createVideoDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll(): Promise<VideoCreationDTO[]> {
    try {
      return this.videoRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }

  findOne(id: string): Promise<VideoCreationDTO> {
    try {
      return this.videoRepository.findOne({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(
    id: string,
    updateVideoDto: VideoUpdationDTO,
  ): Promise<VideoCreationDTO> {
    try {
      return await this.videoRepository.save({ id, ...updateVideoDto });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.videoRepository.delete({ id });
      return true;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getVideoPathById(id: string): Promise<string> {
    try {
      const cachedPath = await this.cacheManager.get(`video-${id}`);
      if (cachedPath && cachedPath !== '') {
        return `${cachedPath}`;
      }
      const video = await this.videoRepository.findOne(id);
      if (!video) {
        throw new NotFoundException(`Video with id ${id} is not existed`);
      }
      const url = video.videoUrl;
      if (!url || url === '') {
        throw new NotFoundException(
          `Video with id ${id} does not have a valid url`,
        );
      }
      await this.cacheManager.set(`video-${id}`, url, { ttl: 30 * 60 });
      return url;
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
