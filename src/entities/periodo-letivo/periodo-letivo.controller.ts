import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { CreatePeriodoLetivoBatchDto } from './dto/create-periodo-letivo-batch.dto';

@Controller('periodo-letivo')
export class PeriodoLetivoController {
  constructor(private readonly periodoLetivoService: PeriodoLetivoService) {}

  

  @Post('Batch')
    async createBatch(@Body() dto: CreatePeriodoLetivoBatchDto) {
      return this.periodoLetivoService.createBatch(dto);
    }
  
    @Patch(':id/revalidar')
    async revalidarPeriodo(
      @Param('id') id: string, @Body() updateDto: UpdatePeriodoLetivoDto
    ){
      return this.periodoLetivoService.updateInvalidPeriodos(id,updateDto);
    }

  }
