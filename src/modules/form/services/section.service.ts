import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Section, SharedService } from '@app/rkpk';

@Injectable()
export class SectionService extends SharedService<Section> {
  constructor(
    @InjectRepository(Section)
    repository: TreeRepository<Section>,
  ) {
    super(repository, Section);
  }
}
