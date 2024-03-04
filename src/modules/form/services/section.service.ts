import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { EnrollmentSection, SharedService } from '@app/opensync';

@Injectable()
export class SectionService extends SharedService<EnrollmentSection> {
  constructor(
    @InjectRepository(EnrollmentSection)
    repository: TreeRepository<EnrollmentSection>,
  ) {
    super(repository, EnrollmentSection);
  }
}
