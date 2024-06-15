import { ApiProperty } from '@nestjs/swagger';

export class NotFoundError {
  @ApiProperty({ example: 'Record could not be found' })
  error: string;
}

export class BadRequestError {
  @ApiProperty({ example: 'At least one field should be filled' })
  error: string;
}

export class InternalServerError {
  @ApiProperty({ example: 'Internal server error' })
  error: string;
}

export class UnauthorizedError {
  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}

export class GetMany {
  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 100 })
  pageSize: number;

  @ApiProperty({ example: [] })
  'Resource Name Plural': GetOne[];
}

export class GetOne {
  @ApiProperty({
    type: Object,
    example: {
      id: 'c4fbf12e-9af3-4445-b167-01bade727b5c',
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
  })
  object: object;
}
