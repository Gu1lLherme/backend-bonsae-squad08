import { IsUUID, IsEnum, IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { EtapaImportacao, StatusImportacao } from '../schemas/processo-importacao.schema';

export enum ProcessoStatus {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  ERRO = 'ERRO',
}

export class UpdateProcessoImportacaoDto {
  @IsUUID()
  processId: string;

  @IsOptional()
  @IsEnum(EtapaImportacao)
  etapaAtual?: EtapaImportacao;

  @IsOptional()
  @IsEnum(StatusImportacao)
  status?: StatusImportacao;

  @IsOptional()
  @IsInt()
  totalRegistros?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  erros?: string[];
}
