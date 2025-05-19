import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUsuarioDto } from './create-usuario.dto';

export class CreateUsuarioBatchDto {

@IsArray()
@ArrayMinSize(1, { message: 'Deve haver pelo menos uma turma.' })
@ValidateNested({ each: true })
@Type(() => CreateUsuarioDto)
usuarios: CreateUsuarioDto[];
}