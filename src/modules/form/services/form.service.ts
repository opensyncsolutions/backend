import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Form, SharedService } from '@app/rkpk';

@Injectable()
export class FormService extends SharedService<Form> {
  constructor(
    @InjectRepository(Form)
    repository: TreeRepository<Form>,
  ) {
    super(repository, Form);
  }
}
