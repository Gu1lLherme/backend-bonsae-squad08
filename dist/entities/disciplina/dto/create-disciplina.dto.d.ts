export declare enum CategoriaDisciplina {
    Curso = "Curso",
    NPJ = "NPJ",
    ProjetosExtensionistas = "Projetos Extensionistas",
    TCC = "TCC"
}
export declare class CreateDisciplinaDto {
    periodoLetivo: string;
    disciplina?: string;
    codigoDisciplina: string;
    dataInicial: string;
    dataFinal: string;
    categoria: CategoriaDisciplina;
    periodoCurricular?: string;
    estado?: string;
    campos?: string;
}
