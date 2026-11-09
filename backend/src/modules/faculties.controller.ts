import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JsonDbService } from '../database/json-db.service';

@Controller('api/faculties')
export class FacultiesController {
  constructor(private readonly db: JsonDbService) {}

  @Get()
  getAll() {
    return this.db.getFaculties();
  }

  @Post()
  create(@Body() facultyData: any) {
    return this.db.createFaculty(facultyData);
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() updates: any) {
    return this.db.updateFaculty(code, updates);
  }

  @Delete(':code')
  delete(@Param('code') code: string) {
    return { success: this.db.deleteFaculty(code) };
  }
}

