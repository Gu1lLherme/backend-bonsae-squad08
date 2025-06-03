export declare class Disciplina {
    id: number;
    periodoLetivo: string;
    disciplina: string;
    codigoDisciplina: string;
    dataInicial: Date;
    dataFinal: Date;
    categoria: string;
    periodoCurricular?: string;
    estado?: string;
    campus?: string;
    batchId: string;
    valid: boolean;
    validationErrors?: string[];
    created_at: Date;
    updated_at: Date;
}
