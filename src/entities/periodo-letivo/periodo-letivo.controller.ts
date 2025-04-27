import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';

@Controller('periodo-letivo')
export class PeriodoLetivoController {
  constructor(private readonly periodoLetivoService: PeriodoLetivoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createPeriodoLetivoDto: CreatePeriodoLetivoDto) {
    const periodo = await this.periodoLetivoService.create(createPeriodoLetivoDto);
    return { message: 'Período letivo criado com sucesso!', data: periodo };
  }


  //Need FIX PORRAAA
  @Post('bulk')
    @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
    async bulkCreate(@Body() createPeriodoLetivoDto: CreatePeriodoLetivoDto[]) {
      const periodosCriados = await this.periodoLetivoService.bulkCreate(createPeriodoLetivoDto);
      return {
        message: 'Períodos registrados com sucesso!',
        data: periodosCriados,
      };
    }

  @Get()
  async findAll() {
    const periodos = await this.periodoLetivoService.findAll();
    return { message: 'Lista de períodos letivos!', data: periodos };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const periodo = await this.periodoLetivoService.findOne(id);
    return { message: 'Detalhes do período letivo!', data: periodo };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() updatePeriodoLetivoDto: UpdatePeriodoLetivoDto) {
    const periodo = await this.periodoLetivoService.update(id, updatePeriodoLetivoDto);
    return { message: 'Período letivo atualizado com sucesso!', data: periodo };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.periodoLetivoService.remove(id);
    return { message: 'Período letivo removido com sucesso!' };
  }
}