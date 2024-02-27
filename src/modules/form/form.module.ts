import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field, Form } from '@app/rkpk';
import { FormController } from './controllers/form.controller';
import { FormService } from './services/form.service';
import { FieldController } from './controllers/field.controller';
import { FieldService } from './services/field.service';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Field])],
  controllers: [FormController, FieldController],
  providers: [FormService, FieldService],
})
export class FormModule {}
