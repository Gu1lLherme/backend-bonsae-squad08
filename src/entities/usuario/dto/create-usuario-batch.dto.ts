import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUsuarioDto } from './create-usuario.dto';

export class CreateUsuarioBatchDto {

@IsOptional()
@IsUUID('4', { message: 'ID do lote deve ser um UUID válido.' })
processId?: string;    

@IsArray()
@ArrayMinSize(1, { message: 'Deve haver pelo menos uma turma.' })
@ValidateNested({ each: true })
@Type(() => CreateUsuarioDto)
usuarios: CreateUsuarioDto[];
}