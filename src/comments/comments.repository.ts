import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comments } from './comments.schema';
import { CommentsCreateDto } from './dto/comments.create.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
  ) {}

  getCommentsModel() {
    return this.commentsModel;
  }

  async findCommentsById(
    id: string | Types.ObjectId,
  ): Promise<Comments | null> {
    return await this.commentsModel.findById(id);
  }

  async findAllComments(): Promise<Comments[] | null> {
    return await this.commentsModel.find();
  }

  async createComment(info: string, data: CommentsCreateDto) {
    return await this.commentsModel.create({ ...data, info });
  }
}
