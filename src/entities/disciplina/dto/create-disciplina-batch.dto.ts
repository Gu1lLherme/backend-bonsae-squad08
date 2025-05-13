import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { CreateDisciplinaDto } from "./create-disciplina.dto";

export class CreateDisciplinaBatchDto {

    @IsArray()
    @ArrayMinSize(1, { message: 'Deve haver pelo menos uma disciplina.' })
    @ValidateNested({ each: true })
    @Type(() => CreateDisciplinaDto)
    disciplinas: CreateDisciplinaDto[];
}	