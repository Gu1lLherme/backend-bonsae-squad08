import { IsOptional, IsString } from 'class-validator';

export class CreateProcessoImportacaoDto {
  @IsOptional()
  @IsString()
  descricao?: string;

  // campos adicionais que você quiser aceitar na criação
}
