import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePeriodoLetivoDto } from './create-periodo-letivo.dto';

export class ImportPeriodoLetivoDto {
  @IsUUID('4', { message: 'processId deve ser um UUID v4 válido.' })
  processId: string;

  @ValidateNested()
  @Type(() => CreatePeriodoLetivoDto)
  periodos: CreatePeriodoLetivoDto[];
}