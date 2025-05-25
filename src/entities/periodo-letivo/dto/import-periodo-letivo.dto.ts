import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { CreatePeriodoLetivoDto } from './create-periodo-letivo.dto';

export class ImportPeriodoLetivoDto {
  
  @IsArray()
  @ArrayNotEmpty({ message: 'Deve haver pelo menos um período letivo.' })
  @ValidateNested()
  @Type(() => CreatePeriodoLetivoDto)
  periodos: CreatePeriodoLetivoDto[];
}