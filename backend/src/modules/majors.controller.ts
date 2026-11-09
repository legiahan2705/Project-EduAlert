import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JsonDbService } from '../database/json-db.service';

@Controller('api/majors')
export class MajorsController {
  constructor(private readonly db: JsonDbService) {}

  @Get()
  getAll() {
    return this.db.getMajors();
  }

  @Post()
  create(@Body() majorData: any) {
    return this.db.createMajor(majorData);
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() updates: any) {
    return this.db.updateMajor(code, updates);
  }

  @Delete(':code')
  delete(@Param('code') code: string) {
    return { success: this.db.deleteMajor(code) };
  }

  // CTĐT (Curriculum) của Ngành
  @Get(':code/curriculum')
  getCurriculum(@Param('code') code: string) {
    const all = this.db.getCurriculum();
    return all[code] || [];
  }

  @Put(':code/curriculum')
  updateCurriculum(@Param('code') code: string, @Body() courses: any[]) {
    return this.db.updateMajorCurriculum(code, courses);
  }
}

