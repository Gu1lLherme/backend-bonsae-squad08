import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTurmaDto } from './create-turma.dto';

export class CreateTurmaBatchDto {

@IsArray()
@ArrayMinSize(1, { message: 'Deve haver pelo menos uma turma.' })
@ValidateNested({ each: true })
@Type(() => CreateTurmaDto)
turmas: CreateTurmaDto[];
}