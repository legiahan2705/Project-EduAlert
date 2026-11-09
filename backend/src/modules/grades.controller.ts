import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { JsonDbService } from '../database/json-db.service';

@Controller('api/grades')
export class GradesController {
  constructor(private readonly db: JsonDbService) {}

  @Get()
  getAll() {
    return this.db.getCourseGrades();
  }

  @Put(':sheetId')
  saveGradeSheet(@Param('sheetId') sheetId: string, @Body() sheetData: any) {
    return this.db.saveCourseGradeSheet(sheetId, sheetData);
  }
}

