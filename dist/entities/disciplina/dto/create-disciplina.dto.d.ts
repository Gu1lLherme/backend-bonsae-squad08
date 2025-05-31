import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsAfterStartDate implements ValidatorConstraintInterface {
    validate(dataFinal: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class CreateDisciplinaDto {
    periodoLetivo: string;
    disciplina: string;
    codigoDisciplina: string;
    dataInicial: string;
    dataFinal: string;
    categoria: "Curso" | "TCC" | "NPJ" | "Projetos Extencionistas";
    periodoCurricular?: string;
    estado?: 'Ativo' | 'Inativo';
    campus?: string;
}
