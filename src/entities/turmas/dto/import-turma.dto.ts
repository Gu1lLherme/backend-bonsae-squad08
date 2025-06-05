import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { CreateTurmaDto} from './create-turma.dto';

export class ImportPeriodoLetivoDto {

  @IsUUID('4', { message: 'O ID do processo deve ser um UUID válido.' })
  processID: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Deve haver pelo menos uma turma' })
  @ValidateNested()
  @Type(() => CreateTurmaDto)
  turmas: CreateTurmaDto[];
}