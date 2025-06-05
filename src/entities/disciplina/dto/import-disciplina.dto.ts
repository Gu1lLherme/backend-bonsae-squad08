import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { CreateDisciplinaDto} from './create-disciplina.dto';

export class ImportDisciplinaDto {

  @IsUUID('4', { message: 'O ID do processo deve ser um UUID válido.' })
  processID: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Deve haver pelo menos uma turma' })
  @ValidateNested()
  @Type(() => CreateDisciplinaDto)
  disciplinas: CreateDisciplinaDto[];
}