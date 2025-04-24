import { isEmpty, IsDate, IsEmpty, } from "class-validator";

export class CreatePeriodoLetivoDto {
    @IsEmpty()
    codigo_periodo_letivo: string;
    @IsEmpty()
    periodo_letivo: number; 
    @IsEmpty()
    data_incial: Date;
    @IsEmpty()
    data_final:  Date; 


}
