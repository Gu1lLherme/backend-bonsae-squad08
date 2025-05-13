import { ArrayMinSize, isArray, Validate, ValidateNested } from "class-validator";
import { CreatePeriodoLetivoDto } from "./create-periodo-letivo.dto";
import { Type } from "class-transformer";


export class CreatePeriodoLetivoBatchDto {

    @Validate(isArray, { message: 'Payload precisa ser um array de objetos Periodo Letivo.' })
    @ArrayMinSize(1, { message: 'Deve haver pelo menos um período letivo.' })
    @ValidateNested({ each: true }) 
    @Type(() => CreatePeriodoLetivoDto)
    periodoLetivo: CreatePeriodoLetivoDto[];
}