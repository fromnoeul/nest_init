import { BadRequestException, Injectable } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsRepository } from '../comments.repository';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepo: CommentsRepository,
    private readonly catsRepo: CatsRepository,
  ) {}
  async getAllComments() {
    try {
      const comments = await this.commentsRepo.findAllComments();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CommentsCreateDto) {
    try {
      const { author, contents } = commentData;
      const targetCat = await this.catsRepo.findCatByIdWithoutPassword(id);
      const valAuthor = await this.catsRepo.findCatByIdWithoutPassword(author);
      const createdComment = await this.commentsRepo.createComment(
        targetCat._id,
        {
          author: valAuthor._id,
          contents,
        },
      );
      return await createdComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async upvoteLike(id: string) {
    try {
      const comment = await this.commentsRepo.findCommentsById(id);
      comment.likes += 1;
      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
