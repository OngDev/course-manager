import { catchError } from './../../common/helpers/catch-error';
import { Repository } from 'typeorm';
import { Subtitle } from 'src/modules/subtitles/entities/subtitle.entity';
import { Injectable, Logger } from '@nestjs/common';
import { SubtitleCreationDTO } from './dto/create-subtitle.dto';
import { SubtitleUpdatingDTO } from './dto/update-subtitle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class SubtitlesService {
  constructor(
    @InjectRepository(Subtitle)
    private readonly subtitleRepository: Repository<Subtitle>,
    private readonly logger: Logger,
  ) {}

  async create(subtitleCreationDTO: SubtitleCreationDTO): Promise<Subtitle> {
    try {
      // miss check video and supporter
      return await this.subtitleRepository.save({
        ...subtitleCreationDTO,
        createdBy: '',
        updatedBy: '',
      });
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async findAll(
    paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: Subtitle[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;

      const [data, totalCount] = await this.subtitleRepository.findAndCount({
        skip: offset,
        take: limit,
        order: { createdAt: 'DESC' },
      });

      return {
        data,
        totalPage: Math.ceil(totalCount / limit),
        totalCount,
      };
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async findOne(id: string): Promise<Subtitle> {
    try {
      return await this.subtitleRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async update(
    id: string,
    subtitleUpdatingDTO: SubtitleUpdatingDTO,
  ): Promise<Subtitle> {
    try {
      const subtitle = await this.subtitleRepository.preload({
        id,
        ...subtitleUpdatingDTO,
      });

      return await this.subtitleRepository.save(subtitle);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async remove(id: string){
    try {
      await this.subtitleRepository.delete(id);
      return { message: 'ok' };
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }
}
