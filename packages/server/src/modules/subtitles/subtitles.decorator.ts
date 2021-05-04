import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Subtitle } from './entities/subtitle.entity';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';

export function SubtitleSwagger() {
  return applyDecorators(ApiTags('Subtitle'));
}

export function CreateSubtitleSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create subtitle' }),
    ApiCreatedResponse({
      description: 'Create subtitle successfully',
      type: Subtitle,
    }),
    ApiBadRequestResponse({
      description: 'Create subtitle fail',
    }),
    ApiBody({ type: CreateSubtitleDto }),
  );
}

export function UpdateSubtitleSwagger() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Update subtitle successfully',
      type: Subtitle,
    }),
    ApiNotFoundResponse({
      description: 'Subtitle id is not found',
    }),
    ApiBody({
      type: UpdateSubtitleDto,
    }),
  );
}
