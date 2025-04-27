import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePeriodoLetivoDto {
  
  @IsString({ message: 'O código do período letivo deve ser uma string.' })
  @IsNotEmpty( { message: 'O código do período letivo não pode ser vazio.' })
  codigoPeriodoLetivo: string;

  @IsString( { message: 'O nome do período letivo deve ser uma string.' })
  @IsNotEmpty( { message: 'O nome do período letivo não pode ser vazio.' })
  periodoLetivo: string;

  @IsDateString()
  @IsNotEmpty( { message: 'A data inicial não pode ser vazia.' })
  dataInicial: Date;

  @IsDateString()
  @IsNotEmpty( { message: 'A data final não pode ser vazia.' })
  dataFinal: Date;
}
