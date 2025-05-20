import { IsNotEmpty, IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';


  

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEnum(['Advogado(a)','Coordenador(a)','Professor(a)','Estagiário(a)','Aluno(a)','Secretário(a)'])
  perfil: string;

  @IsOptional()
  @IsString()
  subperfil?: string;

  @IsNotEmpty()
  nome: string;

  @IsOptional()
  numeroOab?: string;

  @IsOptional()
  seccional?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  matriculaIes?: string;

  @IsOptional()
  telefone?: string;

  @IsNotEmpty()
  cpf?: string;

  @IsNotEmpty()
  senha: string;

  @IsOptional()
  periodoCurricular?: string;

  @IsOptional()
  observacoes?: string;
}