import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum PerfilUsuario {
  Coordenador = 'Coordenador(a)',
  Professor = 'Professor(a)',
  Aluno = 'Aluno(a)',
  Secretario = 'Secretário(a)',
  Estagiario = 'Estagiário(a)',
  Advogado = 'Advogado(a)',
}

export class CreateUsuarioDto {
  @IsEnum(PerfilUsuario, { message: 'Perfil inválido.' })
  perfil: PerfilUsuario;

  @IsOptional()
  @IsString()
  subperfil?: string;

  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  numeroOab?: string;

  @IsOptional()
  @IsString()
  seccional?: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsOptional()
  @IsString()
  matriculaIes?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @IsString()
  senha: string;

  @IsOptional()
  @IsString()
  periodoCurricular?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
