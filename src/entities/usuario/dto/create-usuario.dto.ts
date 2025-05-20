import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsOptional, IsEnum, IsString, Length, Matches } from 'class-validator';


  

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEnum(['Advogado(a)','Coordenador(a)','Professor(a)','Estagiário(a)','Aluno(a)','Secretário(a)'], { message: 'O perfil deve ser um dos seguintes: Advogado(a), Coordenador(a), Professor(a), Estagiário(a), Aluno(a), Secretário(a).' })
  perfil: string;

  @IsOptional()
  @IsString({ message: 'O subperfil deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  subperfil?: string;

  @IsNotEmpty()
  @IsString({ message: 'O nome deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'O sobrenome deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^[0-9]{1,6}$/, {message: 'Número da OAB inválido. Use até 6 dígitos.',})
  numeroOab?: string;

  @IsOptional()
  @IsString({ message: 'A seccional da OAB deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^[A-Z]{2}$/, {message: 'Seccional inválida. Use a sigla do estado (ex: SE, SP).',})
  seccionalOab?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' })
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^[A-Za-z0-9_-]$/, {message:'Matrícula inválida. Use letras, números, hífen ou underscore (mínimo 4 caracteres).',})
  @Length(4, 20, { message: 'A matrícula deve ter entre 4 e 20 caracteres.' })
  matriculaIes?: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @Matches(/^\d{2} \d{4,5}-\d{4}$/, { message: 'O telefone deve estar no formato (XX) XXXXX-XXXX. ou similar' })
  telefone?: string;

  @IsNotEmpty()
  @IsString({ message: 'O CPF deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato XXX.XXX.XXX-XX.' })
  cpf?: string;

  @IsNotEmpty()
  @IsString({ message: 'A senha deve ser uma string.' })
  @Length(6, 64, { message: 'A senha deve ter entre 6 e 64 caracteres.' })
  senha: string;

  @IsOptional()
  @IsString({ message: 'O campus deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  periodoCurricular?: string;

  @IsOptional()
  @IsString({ message: 'O campus deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  observacoes?: string;
}