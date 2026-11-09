import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FacultiesController } from './modules/faculties.controller';
import { MajorsController } from './modules/majors.controller';
import { StudentsController } from './modules/students.controller';
import { ClassesController } from './modules/classes.controller';
import { GradesController } from './modules/grades.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    FacultiesController,
    MajorsController,
    StudentsController,
    ClassesController,
    GradesController,
  ],
  providers: [],
})
export class AppModule {}
