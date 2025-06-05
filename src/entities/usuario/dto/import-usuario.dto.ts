import { IsAfterStartDate } from "src/entities/disciplina/dto/create-disciplina.dto";
import { CreateUsuarioDto } from "./create-usuario.dto";
import { ArrayNotEmpty, IsArray, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ImportUsuarioDto {

    @IsUUID('4', { message: 'O ID do processo deve ser um UUID válido.' })
    processID: string;

    @IsArray()
    @ArrayNotEmpty({ message: 'Deve haver pelo menos um usuário.' })
    @ValidateNested()
    @Type(() => CreateUsuarioDto)
    usuarios: CreateUsuarioDto[];
}