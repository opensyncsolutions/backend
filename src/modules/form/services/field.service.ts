import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Field, SharedService } from '@app/rkpk';

@Injectable()
export class FieldService extends SharedService<Field> {
  constructor(
    @InjectRepository(Field)
    repository: TreeRepository<Field>,
  ) {
    super(repository, Field);
  }
}
