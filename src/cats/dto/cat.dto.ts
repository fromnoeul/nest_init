import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['name', 'email']) {
  @ApiProperty({
    example: '3280199',
    description: 'id',
  })
  id: string;
}
