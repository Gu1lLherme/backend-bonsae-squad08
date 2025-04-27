import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';

@Injectable()
export class PeriodoLetivoService {
  
}
