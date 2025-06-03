import { IsUUID, IsEnum } from 'class-validator';

export enum ProcessoStatus {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  ERRO = 'ERRO',
}

export class UpdateProcessoImportacaoDto {
  @IsUUID()
  processId: string;

  @IsEnum(ProcessoStatus)
  status: ProcessoStatus;
}
