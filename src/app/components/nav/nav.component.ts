import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Curso } from '../../models/curso.model';

import { CursoService, EventEmitterService } from '../../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  cursos: Curso[];
  possuiErro: boolean;

  constructor(private router: Router, private cursoService: CursoService) {
    EventEmitterService.get('boolean').subscribe(() =>
      this.renderizacaoInicial()
    );
  }

  ngOnInit(): void {
    this.renderizacaoInicial();
  }

  renderizacaoInicial(): void {
    this.cursoService
      .listarTodos()
      .subscribe(
        (response) => (this.cursos = response),
        (error) => (this.possuiErro = true)
      )
      .add(() => {
        if (this.cursos && this.cursos.length > 1) {
          this.cursos.sort((a, b) => (a.nome > b.nome ? 1 : 0));
        }
      });
  }

  onClickNavigate(curso: Curso): void {
    this.router.navigate(['curso', curso.id], {
      state: { cursoId: curso.id },
    });
  }
}
