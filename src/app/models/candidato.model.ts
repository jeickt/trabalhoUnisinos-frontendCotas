import { Curso } from './curso.model';

export class Candidato {
  constructor(
    public id?: string,
    public nome?: string,
    public campus?: string,
    public nivelDoCurso?: string,
    public cotaDeInscricao?: number,
    public pontuacao?: number,
    public posicao?: number,
    public concorrenteAtivo?: boolean,
    public matriculado?: number,
    public cotaEscolaPublica?: boolean,
    public cotaRendaInferior?: boolean,
    public cotaPretoPardo?: boolean,
    public cotaIndigena?: boolean,
    public cotaPCD?: boolean,
    public curso?: Curso,
    public cotasAConcorrer?: Array<string>,
    public chamadasConcorridas?: Map<string, string>
  ) {}
}
