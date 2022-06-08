import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Candidato } from '../../models';

import { CandidatoService } from '../../services';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  candidatos: Candidato[];
  possuiErro: boolean;
  cursoId: number = +this.router.url.substr(-1);
  consultaAoBack: number;
  chamada: number;
  pagina: number;
  cotasAExcluir: Map<string, Array<string>> = new Map();

  constructor(
    private router: Router,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.renderizacaoInicial();
  }

  renderizacaoInicial(): void {
    this.consultaAoBack = 3;
    let promise = this.recuperarLista(this.consultaAoBack);
    promise.then((resultado) => {
      if (resultado.length == 0) {
        this.consultaAoBack = 2;
        this.chamada = 2;
        this.pagina = 2;
        let promise = this.recuperarLista(this.consultaAoBack);
        promise.then((resultado) => {
          if (resultado.length == 0) {
            this.consultaAoBack = 1;
            this.chamada = 1;
            this.pagina = 1;
            let promise = this.recuperarLista(this.consultaAoBack);
            promise.then((resultado) => {
              if (resultado.length == 0) {
                let promise = this.gerarLista(1);
                promise.then((resultado) => {
                  this.candidatos = resultado.sort(this.ordenarLista);
                });
              } else {
                this.candidatos = resultado.sort(this.ordenarLista);
              }
            });
          } else {
            this.candidatos = resultado.sort(this.ordenarLista);
          }
        });
      } else {
        this.candidatos = resultado.sort(this.ordenarLista);
      }
    });
  }

  async recuperarLista(chamada: number): Promise<Candidato[]> {
    let promise = new Promise<Candidato[]>((resolve) => {
      this.candidatoService
        .retrieveList(this.cursoId, chamada)
        .subscribe((response) => {
          resolve(response);
        });
    });
    return await promise;
  }

  async gerarLista(chamada: number): Promise<Candidato[]> {
    let promise = new Promise<Candidato[]>((resolve) => {
      this.candidatoService
        .generateList(this.cursoId, chamada)
        .subscribe((response) => {
          resolve(response);
        });
    });
    return await promise;
  }

  ordenarLista = (a: Candidato, b: Candidato) => {
    return a.posicao - b.posicao;
  };

  retrieveList(chamada: number): void {
    let promise = this.recuperarLista(chamada);
    promise.then((resultado) => {
      this.candidatos = resultado.sort(this.ordenarLista);
      this.pagina = chamada;
    });
  }

  callResultFile(): void {
    let promise = new Promise<Candidato[]>((resolve) => {
      this.candidatoService
        .callResultFile(this.candidatos, this.cotasAExcluir)
        .subscribe((response) => {
          resolve(response);
        });
    });
    promise
      .then((_) => {
        return this.gerarLista(++this.chamada);
      })
      .then((resultado) => {
        this.candidatos = resultado.sort(this.ordenarLista);
        ++this.pagina;
      });
  }

  deleteData(): void {
    if (confirm('Confirmar exclusão de dados?')) {
      this.candidatoService.delete(this.cursoId);
    }
  }

  toggleCotas(
    candidato: Candidato,
    tipoDeCota: string,
    exclusao: boolean
  ): void {
    let array = this.cotasAExcluir.get(candidato.id);
    if (exclusao) {
      if (array && array.length > 0) {
        array.push(tipoDeCota);
        this.cotasAExcluir.set(`${candidato.id}`, array);
        this.switchCota(candidato, tipoDeCota);
      } else {
        this.cotasAExcluir.set(`${candidato.id}`, [tipoDeCota]);
        this.switchCota(candidato, tipoDeCota);
      }
    } else {
      if (array && array.length > 0) {
        array = array.filter((el) => tipoDeCota !== el);
        this.cotasAExcluir.set(`${candidato.id}`, array);
        this.switchCota(candidato, tipoDeCota);
      }
    }
  }

  switchCota(candidato: Candidato, tipoDeCota: string): void {
    switch (tipoDeCota) {
      case 'EP':
        this.toggleEP(candidato);
        break;
      case 'RI':
        this.toggleRI(candidato);
        break;
      case 'PP':
        this.togglePP(candidato);
        break;
      case 'I':
        this.toggleI(candidato);
        break;
      case 'PCD':
        this.togglePCD(candidato);
        break;
      default:
    }
  }

  toggleMatriculado(candidato: Candidato): void {
    this.candidatoService.toggleMatriculado(
      candidato.id,
      this.candidatos,
      this.chamada
    );
  }

  toggleConcorrente(candidato: Candidato): void {
    this.candidatoService.toggleConcorrente(candidato.id, this.candidatos);
  }

  toggleEP(candidato: Candidato): void {
    this.candidatoService.toggleEP(candidato.id, this.candidatos);
  }

  toggleRI(candidato: Candidato): void {
    this.candidatoService.toggleRI(candidato.id, this.candidatos);
  }

  togglePP(candidato: Candidato): void {
    this.candidatoService.togglePP(candidato.id, this.candidatos);
  }

  toggleI(candidato: Candidato): void {
    this.candidatoService.toggleI(candidato.id, this.candidatos);
  }

  togglePCD(candidato: Candidato): void {
    this.candidatoService.togglePCD(candidato.id, this.candidatos);
  }
}
