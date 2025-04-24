import { IsString, IsEmail, IsIn, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nome: string;  

  @IsEmail()
  email: string;

  @IsString()
  matricula: string;

  @IsIn(['aluno', 'professor'])
  tipo: 'aluno' | 'professor';

  @IsOptional()
  @IsString()
  curso?: string;

  @IsOptional()
  @IsString()
  departamento?: string;
}
