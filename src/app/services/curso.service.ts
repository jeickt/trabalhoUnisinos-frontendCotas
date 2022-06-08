import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CursoService {
  private readonly BASE_URL = 'https://ws-cotas.herokuapp.com/cursos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append(
      'Access-Control-Allow-Origin',
      'https://fe-cotas.netlify.app/'
    );
    return this.http.get(this.BASE_URL, { headers: headers });
  }
}
