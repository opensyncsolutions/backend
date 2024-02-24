import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Enrollment, SharedService } from '@app/rkpk';

@Injectable()
export class EnrollmentService extends SharedService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment)
    repository: TreeRepository<Enrollment>,
  ) {
    super(repository, Enrollment);
  }
}
