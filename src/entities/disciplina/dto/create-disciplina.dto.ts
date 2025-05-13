import { Prop } from '@nestjs/mongoose';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';



export class CreateDisciplinaDto {
  @IsNotEmpty({ message: 'Período Letivo é obrigatório.' })
  @IsString()
  periodoLetivo: string;

  @IsNotEmpty( { message: 'Disciplina é obrigatória.' })
  @IsString()
  disciplina: string;

  @IsNotEmpty({ message: 'Código da Disciplina é obrigatório.' })
  @IsString()
  codigoDisciplina: string;

  @IsNotEmpty({ message: 'Data Inicial é obrigatória.' })
  @IsDateString({}, { message: 'Data Inicial inválida.' })
  dataInicial: string;

  @IsNotEmpty({ message: 'Data Final é obrigatória.' })
  @IsDateString({}, { message: 'Data Final inválida.' })
  dataFinal: string;

  @IsNotEmpty({ message: 'Categoria é obrigatória.' })
  @IsEnum(["Curso","TCC","NPJ","Projetos Extencionistas"], { message: 'Categoria inválida, a categoria deve se enquadrar em: "Curso","TCC","NPJ","Projetos Extencionistas"' })
  categoria: "Curso"| "TCC"| "NPJ"| "Projetos Extencionistas";

  @IsOptional()
  @IsString()
  periodoCurricular?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  campos?: string;
}
