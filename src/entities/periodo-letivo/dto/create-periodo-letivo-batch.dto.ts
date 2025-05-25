import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePeriodoLetivoDto } from './create-periodo-letivo.dto';


export class CreatePeriodoLetivoBatchDto {

@IsOptional()
@IsUUID('4', { message: 'ID do lote deve ser um UUID válido.' })
processId?: string;


@IsArray()
@ArrayMinSize(1, { message: 'Deve haver pelo menos uma turma.' })
@ValidateNested({ each: true })
@Type(() => CreatePeriodoLetivoDto)
periodos: CreatePeriodoLetivoDto[];
}