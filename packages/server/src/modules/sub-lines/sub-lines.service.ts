import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubLineCreationDTO } from './dto/create-sub-line.dto';
import { SubLineUpdatingDTO } from './dto/update-sub-line.dto';
import { SubLine } from './entities/sub-line.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubtitlesService } from '../subtitles/subtitles.service';
import { catchError } from 'src/common/helpers/catch-error';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class SubLinesService {
  constructor(
    @InjectRepository(SubLine)
    private readonly subLineRepository: Repository<SubLine>,
    private readonly logger: Logger,
    private readonly subtitlesService: SubtitlesService,
  ) {}

  async create(subLineCreationDTO: SubLineCreationDTO): Promise<SubLine> {
    try {
      // miss check supporter
      const subtitle = await this.subtitlesService.findOne(
        subLineCreationDTO.subtitleId,
      );

      if (!subtitle) throw new NotFoundException('Subtitle is not exist');

      return await this.subLineRepository.save({
        ...subLineCreationDTO,
        timestamp: new Date(subLineCreationDTO.timestamp).toISOString(),
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
    data: SubLine[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;

      const [data, totalCount] = await this.subLineRepository.findAndCount({
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

  async findOne(id: string): Promise<SubLine> {
    try {
      return await this.subLineRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async update(
    id: string,
    subLineUpdatingDTO: SubLineUpdatingDTO,
  ): Promise<SubLine> {
    try {
      const subtitle = await this.subLineRepository.preload({
        id,
        ...subLineUpdatingDTO,
      });

      return await this.subLineRepository.save(subtitle);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.subLineRepository.delete(id);
      return { message: 'ok' };
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }
}
