import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinaService.create(createDisciplinaDto);
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
