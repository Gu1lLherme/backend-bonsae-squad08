import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { CreateDisciplinaDto } from "./create-disciplina.dto";

export class CreateDisciplinaBatchDto {

    @IsOptional()
    @IsUUID('4', { message: 'ID do lote deve ser um UUID válido.' })
    processId?: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'Deve haver pelo menos uma disciplina.' })
    @ValidateNested({ each: true })
    @Type(() => CreateDisciplinaDto)
    disciplinas: CreateDisciplinaDto[];
}	