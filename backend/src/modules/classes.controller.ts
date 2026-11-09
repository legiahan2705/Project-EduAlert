import { Controller, Get, Post, Body } from '@nestjs/common';
import { JsonDbService } from '../database/json-db.service';

@Controller('api/classes')
export class ClassesController {
  constructor(private readonly db: JsonDbService) {}

  @Get()
  getAll() {
    return this.db.getClasses();
  }

  @Post()
  create(@Body() classData: any) {
    return this.db.createClass(classData);
  }
}

