import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createTurmaDto: CreateTurmaDto) {
    const turma = await this.turmasService.create(createTurmaDto);
    return {
      message: 'Turma criada com sucesso!',
      data: turma,
    };
  }

  @Get()
  async findAll() {
    const turmas = await this.turmasService.findAll();
    return {
      message: 'Turmas encontradas com sucesso!',
      data: turmas,
    };
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    const turma = await this.turmasService.findOne(id);
    return {  
      message: 'Turma encontrada com sucesso!',
      data: turma,
    };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    const turmaAtualizada = await this.turmasService.update(id, updateTurmaDto);
    return {
      message: 'Turma atualizada com sucesso!',
      data: turmaAtualizada,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.turmasService.remove(id);
    return {  
      message: 'Turma excluída com sucesso!',
    };
  }
}
