import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { EnrollmentStage, SharedService } from '@app/rkpk';

@Injectable()
export class EnrollmentStageService extends SharedService<EnrollmentStage> {
  constructor(
    @InjectRepository(EnrollmentStage)
    repository: TreeRepository<EnrollmentStage>,
  ) {
    super(repository, EnrollmentStage);
  }
}
