import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { EacSession, SharedService } from '@app/opensync';

@Injectable()
export class EacSessionService extends SharedService<EacSession> {
  constructor(
    @InjectRepository(EacSession)
    repository: TreeRepository<EacSession>,
  ) {
    super(repository, EacSession);
  }
}
