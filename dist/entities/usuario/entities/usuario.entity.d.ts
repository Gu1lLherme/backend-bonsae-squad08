export declare class Usuario {
    id: number;
    perfil: string;
    subperfil?: string;
    nome: string;
    numeroOAB?: string;
    seccional?: string;
    email: string;
    matriculaIes?: string;
    telefone?: string;
    cpf?: string;
    senha: string;
    periodoCurricular?: string;
    observacoes?: string;
    batchId: string;
    valid: boolean;
    validationErrors?: string[];
    created_at: Date;
    updated_at: Date;
}
