import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Curso, Candidato } from '../models';
import { EventEmitterService } from '.';

@Injectable()
export class CandidatoService {
  private readonly BASE_URL = 'http://localhost:8080/candidatos';
  curso: Curso;

  constructor(private http: HttpClient, private router: Router) {}

  sendCsvFile(file: File): Promise<Curso> {
    return new Promise((resolve) => {
      this.http.post(this.BASE_URL, file).subscribe((response) => {
        this.curso = response;
        resolve(this.curso);
      });
    });
  }

  generateList(cursoId: number, chamada: number): Observable<any> {
    return this.http.get(
      this.BASE_URL + `?cursoId=${cursoId}&chamadaId=${chamada}`
    );
  }

  retrieveList(cursoId: number, chamada: number): Observable<any> {
    return this.http.get(
      this.BASE_URL + `/retrieveList?cursoId=${cursoId}&chamadaId=${chamada}`
    );
  }

  enrolledList(cursoId: number): Observable<any> {
    return this.http.get(this.BASE_URL + `/enrolledList?cursoId=${cursoId}`);
  }

  callResultFile(
    candidatos: Candidato[],
    cotasAExcluir: Map<string, Array<string>>
  ): Observable<any> {
    candidatos.forEach((cand) => {
      let array = cotasAExcluir[`${cand.id}`];
      if (array) {
        array.forEach((el) => {
          if ((el = 'EP')) {
            cand.cotaEscolaPublica = !cand.cotaEscolaPublica;
            if (!cand.cotaEscolaPublica) {
              cand.cotasAConcorrer = cand.cotasAConcorrer.filter(
                (el) =>
                  !(
                    Array.of(
                      'C2',
                      'C3',
                      'C4',
                      'C5',
                      'C6',
                      'C7',
                      'C8',
                      'C9'
                    ).indexOf(el) >= 0
                  )
              );
            }
          } else if ((el = 'RI')) {
            cand.cotaRendaInferior = !cand.cotaRendaInferior;
            if (!cand.cotaRendaInferior) {
              cand.cotasAConcorrer = cand.cotasAConcorrer.filter(
                (el) => !(Array.of('C2', 'C3', 'C4', 'C5').indexOf(el) >= 0)
              );
            }
          } else if ((el = 'PP')) {
            cand.cotaPretoPardo = !cand.cotaPretoPardo;
            if (!cand.cotaPretoPardo) {
              cand.cotasAConcorrer = cand.cotasAConcorrer.filter(
                (el) =>
                  !(Array.of('C2', 'C3', 'C6', 'C7', 'C11').indexOf(el) >= 0)
              );
            }
          } else if ((el = 'I')) {
            cand.cotaIndigena = !cand.cotaIndigena;
            if (!cand.cotaIndigena) {
              cand.cotasAConcorrer = cand.cotasAConcorrer.filter(
                (el) => !(Array.of('C2', 'C3', 'C6', 'C7').indexOf(el) >= 0)
              );
            }
          } else if ((el = 'PCD')) {
            cand.cotaPCD = !cand.cotaPCD;
            if (!cand.cotaPCD) {
              cand.cotasAConcorrer = cand.cotasAConcorrer.filter(
                (el) =>
                  !(Array.of('C2', 'C4', 'C6', 'C8', 'C10').indexOf(el) >= 0)
              );
            }
          }
        });
      }
    });
    return this.http.put<Candidato[]>(this.BASE_URL, candidatos);
  }

  delete(cursoId: number): void {
    let promise = new Promise<any>((resolve) => {
      this.http.delete(this.BASE_URL + `/${cursoId}`).subscribe((response) => {
        resolve(response);
      });
    });
    promise.then((resultado) => {
      EventEmitterService.get('boolean').emit(true);
      this.router.navigate(['']);
    });
  }

  toggleMatriculado(
    id: string,
    candidatos: Candidato[],
    chamada: number
  ): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        if (objs[index].matriculado == 0) {
          objs[index].matriculado = chamada;
        } else {
          objs[index].matriculado = 0;
        }
        if (objs[index].matriculado > 0) {
          objs[index].concorrenteAtivo = false;
        }
      }
    });
  }

  toggleConcorrente(id: string, candidatos: Candidato[]): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].concorrenteAtivo = !objs[index].concorrenteAtivo;
      }
    });
  }

  toggleEP(id: string, candidatos: Candidato[]): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].cotaEscolaPublica = !objs[index].cotaEscolaPublica;
      }
    });
  }

  toggleRI(id: string, candidatos: Candidato[]): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].cotaRendaInferior = !objs[index].cotaRendaInferior;
      }
    });
  }

  togglePP(id: string, candidatos: Candidato[]): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].cotaPretoPardo = !objs[index].cotaPretoPardo;
      }
    });
  }

  toggleI(id: string, candidatos: Candidato[]): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].cotaIndigena = !objs[index].cotaIndigena;
      }
    });
  }

  togglePCD(id: string, candidatos: Candidato[]): void {
    candidatos.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].cotaPCD = !objs[index].cotaPCD;
      }
    });
  }
}
