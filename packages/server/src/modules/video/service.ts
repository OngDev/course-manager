import { UploadState } from './../../common/enums/upload-state.enum';
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
import { FileUploadByS3 } from '../file-upload/strategies/s3';
import { CoursesService } from '../course/service';
import { VideoCreationDTO } from './dto/create-video.dto';
@Injectable()
export class VideosService extends TypeOrmCrudService<Video> {
  private fileUpload: FileUpload;

  constructor(
    private readonly logger: Logger,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly coursesService: CoursesService,
  ) {
    super(videoRepository);
    this.fileUpload = new FileUploadByS3();
  }

  async create(
    createVideoDto: VideoCreationDTO,
    file: Express.Multer.File,
  ): Promise<VideoCreationDTO> {
    try {
      const course = await this.coursesService.findOne(createVideoDto.courseId);

      if (!course) throw new BadRequestException('Course is not exist');

      const video = await this.videoRepository.save({
        ...createVideoDto,
        course,
        createdBy: '',
        updatedBy: '',
      });

      this.fileUpload
        .uploadVideo(file)
        .then(async (result) => {
          console.log({ result });
          video.videoUrl = result.Location;

          await this.videoRepository.save(video);
        })
        .catch(() => {
          throw new BadRequestException('Upload video fail');
        });

      return video;
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

  async updateUploadState(
    id: string,
    uploadState: UploadState,
  ): Promise<VideoCreationDTO> {
    try {
      return await this.videoRepository.save({ id, uploadState });
    } catch (error) {
      this.logger.error(error);
      catchError(error);
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
