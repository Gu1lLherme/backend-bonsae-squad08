import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePeriodoLetivoDto } from './create-periodo-letivo.dto';


export class CreatePeriodoLetivoBatchDto {

@IsArray()
@ArrayMinSize(1, { message: 'Deve haver pelo menos uma turma.' })
@ValidateNested({ each: true })
@Type(() => CreatePeriodoLetivoDto)
periodosLetivos: CreatePeriodoLetivoDto[];
}