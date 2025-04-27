export declare class CreateTurmaDto {
    codigoDisciplina: string;
    turno: 'Manhã' | 'Tarde' | 'Noite';
    codigoTurma: string;
    nomeTurma: string;
    tipo: 'aluno' | 'professor';
    usuarios?: string[];
}
