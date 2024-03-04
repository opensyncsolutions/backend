import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field, Form, EnrollmentSection } from '@app/opensync';
import { FormController } from './controllers/form.controller';
import { FormService } from './services/form.service';
import { FieldController } from './controllers/field.controller';
import { FieldService } from './services/field.service';
import { SectionController } from './controllers/section.controller';
import { SectionService } from './services/section.service';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Field, EnrollmentSection])],
  controllers: [FormController, FieldController, SectionController],
  providers: [FormService, FieldService, SectionService],
})
export class FormModule {}
