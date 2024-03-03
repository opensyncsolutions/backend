import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Phone, SharedService } from '@app/rkpk';

@Injectable()
export class PhoneService extends SharedService<Phone> {
  constructor(
    @InjectRepository(Phone)
    repository: TreeRepository<Phone>,
  ) {
    super(repository, Phone);
  }
}
