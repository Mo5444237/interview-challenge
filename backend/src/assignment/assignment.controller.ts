import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  async findAll() {
    return this.assignmentService.findAll();
  }

  @Get('/patient/:id')
  findByPatient(@Param('id') patientId: string) {
    return this.assignmentService.findByPatientId(patientId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @Post()
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }
}
