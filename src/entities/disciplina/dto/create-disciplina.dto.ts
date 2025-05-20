import { Prop } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { IsDateString, isEnum, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isAfterStartDate', async: false })
export class IsAfterStartDate implements ValidatorConstraintInterface {
validate(dataFinal: string, args: ValidationArguments) {
const obj: any = args.object;
if (!obj.dataInicial || !dataFinal) return true;
return new Date(dataFinal) > new Date(obj.dataInicial);
}

defaultMessage(args: ValidationArguments) {
return 'A data final deve ser posterior à data inicial.';
}
}

export class CreateDisciplinaDto {
  @IsNotEmpty({ message: 'Período Letivo é obrigatório.' })
  @IsString({ message: 'Período Letivo deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  periodoLetivo: string;

  @IsNotEmpty( { message: 'Disciplina é obrigatória.' })
  @IsString({message: 'Disciplina deve ser uma string.'})
  @Transform(({ value }) => value?.trim())
  @Length(3, 100, { message: 'Disciplina deve ter entre 3 e 100 caracteres.' })
  @Matches(/^[A-Za-zÀ-ÿ0-9\s-().]+$/, {message: 'O nome da disciplina contém caracteres inválidos.',})
  disciplina: string;

  @IsNotEmpty({ message: 'Código da Disciplina é obrigatório.' })
  @IsString({ message: 'Código da Disciplina deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^[A-Z0-9._-]$/, { message: 'Código da Disciplina deve conter apenas letras maiúsculas, números, ponto, hífen ou underscore.' })
  @Length(3, 20, { message: 'Código da Disciplina deve ter entre 3 e 20 caracteres.' })
  codigoDisciplina: string;

  @IsNotEmpty({ message: 'Data Inicial é obrigatória.' })
  @IsDateString({}, { message: 'Data Inicial inválida.' })
  @Type(() => Date)
  dataInicial: string;

  @IsNotEmpty({ message: 'Data Final é obrigatória.' })
  @IsDateString({}, { message: 'Data Final inválida.' })
  @Type(() => Date)
  @Validate(IsAfterStartDate)
  dataFinal: string;

  @IsNotEmpty({ message: 'Categoria é obrigatória.' })
  @IsEnum(["Curso","TCC","NPJ","Projetos Extencionistas"], { message: 'Categoria inválida, a categoria deve se enquadrar em: "Curso","TCC","NPJ","Projetos Extencionistas"' })
  categoria: "Curso"| "TCC"| "NPJ"| "Projetos Extencionistas";

  @IsOptional()
  @IsString({ message: 'PeriodoCurricular deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  periodoCurricular?: string;

  @IsOptional()
  @IsEnum(['Ativo', 'Inativo'], { message: 'Estado deve ser Ativo ou Inativo.' })
  estado?: 'Ativo' | 'Inativo';

  @IsOptional()
  @IsString({ message: 'Campus deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^[A-Za-zÀ-ÿ0-9\s-().]+$/, { message: 'O nome do campus contém caracteres inválidos.', })
  campus?: string;
}
