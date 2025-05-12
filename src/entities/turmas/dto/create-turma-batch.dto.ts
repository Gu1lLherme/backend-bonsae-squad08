import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTurmaDto } from './create-turma.dto';

export class CreateTurmaBatchDto {

/*@IsArray()
@ValidateNested({ each: true })
@Type(() => CreateTurmaDto)*/
turmas: CreateTurmaDto[];
}