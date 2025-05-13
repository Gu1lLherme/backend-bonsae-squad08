import { PartialType } from '@nestjs/mapped-types';
import { CreateTurmaDto } from './create-turma.dto';
import { IsNotEmpty, IsString, Length, IsEnum, Matches } from 'class-validator';

export class UpdateTurmaDto extends PartialType(CreateTurmaDto) {}

    
