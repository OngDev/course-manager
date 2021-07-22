import { catchError } from 'src/common/helpers/catch-error';
import { FileUpload } from './../file-upload/file-upload.interface';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './model';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import { CoursesService } from '../course/service';
import { VideoCreationDTO } from './dto/create-video.dto';
@Injectable()
export class VideosService extends TypeOrmCrudService<Video> {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly coursesService: CoursesService,
  ) {
    super(videoRepository);
  }

  async create(createVideoDto: VideoCreationDTO): Promise<VideoCreationDTO> {
    try {
      const course = await this.coursesService.findOne(createVideoDto.courseId);

      if (!course) throw new BadRequestException('Course is not exist');

      return await this.videoRepository.save({
        ...createVideoDto,
        course,
      });
    } catch (error) {
      this.logger.error(error);
      catchError(error);
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
