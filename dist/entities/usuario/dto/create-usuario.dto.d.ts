export declare enum PerfilUsuario {
    Coordenador = "Coordenador(a)",
    Professor = "Professor(a)",
    Aluno = "Aluno(a)",
    Secretario = "Secret\u00E1rio(a)",
    Estagiario = "Estagi\u00E1rio(a)",
    Advogado = "Advogado(a)"
}
export declare class CreateUsuarioDto {
    perfil: PerfilUsuario;
    subperfil?: string;
    nome: string;
    numeroOab?: string;
    seccionalUfOab?: string;
    email: string;
    matriculaIes?: string;
    telefone?: string;
    cpf?: string;
    senha: string;
    periodoCurricular?: string;
    observacoes?: string;
}
