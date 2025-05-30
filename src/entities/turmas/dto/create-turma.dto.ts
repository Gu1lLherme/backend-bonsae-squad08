import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, IsMongoId, IsArray, IsOptional, IsEnum, Length } from 'class-validator';



export class CreateTurmaDto {

    @IsNotEmpty({ message: 'O código da disciplina é obrigatório.' }) 
    @IsString({ message: 'O código da disciplina deve ser uma string.' }) 
    @Transform(({ value }) => value?.trim())
    @Length(3,50) 
    @Matches(/^[A-Za-z0-9_-]+$/, { message: 'O código da disciplina deve conter apenas letras e números, hífen ou underscore.' })
    codigoDisciplina: string;

    @IsNotEmpty({ message: 'O turno é obrigatório.' })
    @IsString({ message: 'O turno deve ser uma string.' }) 
    @IsEnum(['Manhã', 'Tarde', 'Noite'], { message: 'O turno deve ser Manhã, Tarde ou Noite.', }) 
    turno: 'Manhã' | 'Tarde' | 'Noite';

    @IsNotEmpty({ message: 'O código da turma é obrigatório.' })
    @IsString({ message: 'O código da turma deve ser uma string.' })
    @Transform(({ value }) => value?.trim())
    @Length(2,20, { message: 'O código da turma deve ter entre 2 e 20 caracteres.' })	
    @Matches(/^[A-Za=z0-9_-]+$/, { message: 'O código da turma deve conter apenas letras e números, hífen ou underscore.' })
     codigoTurma: string;

    @IsNotEmpty({ message: 'O nome da turma é obrigatório.' }) 
    @IsString({ message: 'O nome da turma deve ser uma string.' }) 
    @Transform(({ value }) => value?.trim())
    @Matches(/^[A-Za-zÀ-ÿ0-9\s-_.()]+$/, {message: 'O nome da turma contém caracteres inválidos.',})
    @Length(3,100)
    nomeTurma: string;

    @IsNotEmpty({ message: 'O tipo é obrigatório.' })
    @IsEnum(['aluno', 'professor'], { message: 'O tipo deve ser aluno ou professor.', }) 
    @IsString({ message: 'O tipo deve ser uma string.' })
    tipo: 'aluno' | 'professor';

    @IsOptional()
    @IsArray({ message: 'Usuários deve ser uma lista.' })
    @IsMongoId({ each: true, message: 'Cada usuário deve ter um ID válido.' }) 
    usuarios?: string[]; 

}




