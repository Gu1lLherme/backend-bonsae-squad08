export declare class CreateDisciplinaDto {
    periodoLetivo: string;
    disciplina: string;
    codigoDisciplina: string;
    dataInicial: string;
    dataFinal: string;
    categoria: "Curso" | "TCC" | "NPJ" | "Projetos Extencionistas";
    periodoCurricular?: string;
    estado?: string;
    campos?: string;
}
