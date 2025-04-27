import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePeriodoLetivoDto {
  @IsString()
  @IsNotEmpty()
  codigoPeriodoLetivo: string;

  @IsString()
  @IsNotEmpty()
  periodoLetivo: string;

  @IsDateString()
  @IsNotEmpty()
  dataInicial: Date;

  @IsDateString()
  @IsNotEmpty()
  dataFinal: Date;
}
