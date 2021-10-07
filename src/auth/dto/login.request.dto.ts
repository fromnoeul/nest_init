import { Cat } from 'src/cats/cats.schema';
import { PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
