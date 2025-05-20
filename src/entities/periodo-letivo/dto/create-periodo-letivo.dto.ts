import { Transform, Type } from 'class-transformer';
import { IsString, IsDateString, IsNotEmpty, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface , Matches, Length, Validate} from 'class-validator';


@ValidatorConstraint({ name: 'isAfterStartDate', async: false })
class IsAfterStartDate implements ValidatorConstraintInterface {
validate(dataFinal: Date, args: ValidationArguments) {
const object: any = args.object;
return object.dataInicial && dataFinal > object.dataInicial;
}

defaultMessage(args: ValidationArguments) {
return 'A data final deve ser posterior à data inicial.';
}
}

export class CreatePeriodoLetivoDto {
  
  @IsString({ message: 'O código do período letivo deve ser uma string.' })
  @IsNotEmpty( { message: 'O código do período letivo não pode ser vazio.' })
  @Transform(({ value }) => value?.trim())
  @Matches(/^\d{4}.\d{1}$/, {message: 'O código do período letivo deve seguir o formato "YYYY.N" (ex: 2025.1).',})
  codigoPeriodoLetivo: string;

  @IsString( { message: 'O nome do período letivo deve ser uma string.' })
  @IsNotEmpty( { message: 'O nome do período letivo não pode ser vazio.' })
  @Transform(({ value }) => value?.trim())
  @Length(5,50, { message: 'O nome do período letivo deve ter entre 5 e 50 caracteres.' })
  @Matches(/^[A-Za-zÀ-ÿ0-9\s-().]+$/, {message: 'O nome do período letivo contém caracteres inválidos.',})
  periodoLetivo: string;

  @IsDateString()
  @IsNotEmpty( { message: 'A data inicial não pode ser vazia.' })
  @Type(() => Date)
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data final deve estar no formato YYYY-MM-DD.' })
  dataInicial: Date;

  @IsDateString()
  @IsNotEmpty( { message: 'A data final não pode ser vazia.' })
  @Validate(IsAfterStartDate, {
  message: 'A data final deve ser posterior à data inicial.' })
  @Type(() => Date)
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data final deve estar no formato YYYY-MM-DD.' })
  dataFinal: Date;
}



