import { IsNotEmpty, IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';

export enum PerfilUsuario {
  Coordenador = 'Coordenador(a)',
  Professor = 'Professor(a)',
  Aluno = 'Aluno(a)',
  Secretario = 'Secretário(a)',
  Estagiario = 'Estagiário(a)',
  Advogado = 'Advogado(a)',
}

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEnum(PerfilUsuario)
  perfil: PerfilUsuario;

  @IsOptional()
  @IsString()
  subperfil?: string;

  @IsNotEmpty()
  nome: string;

  @IsOptional()
  numeroOab?: string;

  @IsOptional()
  seccionalUfOab?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  matriculaIes?: string;

  @IsOptional()
  telefone?: string;

  @IsOptional()
  cpf?: string;

  @IsNotEmpty()
  senha: string;

  @IsOptional()
  periodoCurricular?: string;

  @IsOptional()
  observacoes?: string;
}