export declare class TurmaSQLEntity {
    id: number;
    codigoDisciplina: string;
    turno: string;
    codigoTurma: string;
    nomeTurma: string;
    tipo: string;
    usuarios?: string[];
    batchId: string;
    valid: boolean;
    validationErrors?: string[];
    created_at: Date;
    updated_at: Date;
}
