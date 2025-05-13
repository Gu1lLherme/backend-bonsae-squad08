import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { CreateDisciplinaBatchDto } from './dto/create-disciplina-batch.dto';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    const disciplina = await this.disciplinaService.create(createDisciplinaDto);
    return {
      message: 'Disciplina criada com sucesso!',
      data: disciplina,
    };
  }


  @Post('bulk')
    @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
    async bulkCreate(@Body() createDisciplinasDto: CreateDisciplinaDto[]) {
      const disciplinasCriadas = await this.disciplinaService.bulkCreate(createDisciplinasDto);
      return {
        message: 'Disciplinas criadas com sucesso!',
        data: disciplinasCriadas,
      };
    }

    @Post('batch')
    async createBatch(@Body() dto: CreateDisciplinaBatchDto) {
      return this.disciplinaService.createBatch(dto);
    }
    
    @Patch(':id/revalida-batch')
    async revalidarTurma(
      @Param('id') id: string, @Body() updateDto: UpdateDisciplinaDto
    ) {
      return this.disciplinaService.updateInvalidDisciplinas(id, updateDto);
    }

  @Get()
  findAll() {
    return this.disciplinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisciplinaDto: UpdateDisciplinaDto) {
    return this.disciplinaService.update(+id, updateDisciplinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinaService.remove(+id);
  }
}
