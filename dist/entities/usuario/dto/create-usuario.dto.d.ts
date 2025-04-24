export declare class CreateUsuarioDto {
    nome: string;
    email: string;
    matricula: string;
    tipo: 'aluno' | 'professor';
    curso?: string;
    departamento?: string;
}
