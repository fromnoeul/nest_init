import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get all comments from cat profiles.' })
  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: 'Leave a comment to certain profile.' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return await this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: 'upvote like.' })
  @Patch(':id')
  async upvoteLike(@Param('id') id: string) {
    return await this.commentsService.upvoteLike(id);
  }
}
