import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { JsonDbService } from '../database/json-db.service';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly db: JsonDbService) {}

  @Get()
  getAll() {
    return this.db.getStudents();
  }

  @Get(':maSV')
  getOne(@Param('maSV') maSV: string) {
    const list = this.db.getStudents();
    return list.find((s) => s.maSV === maSV) || null;
  }

  @Put(':maSV')
  update(@Param('maSV') maSV: string, @Body() updates: any) {
    return this.db.updateStudent(maSV, updates);
  }

  // Thêm ghi chú tư vấn của Cố vấn học tập (Counseling Note)
  @Post(':maSV/counseling')
  addCounselingNote(@Param('maSV') maSV: string, @Body() noteObj: any) {
    return this.db.addCounselingLog(maSV, noteObj);
  }
}

