import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CandidatoService, EventEmitterService } from '../../services';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {}

  sendCsvFile(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      let cursoId = this.candidatoService
        .sendCsvFile(file)
        .then((curso: Curso) => {
          this.router.navigate(['curso', curso.id], {
            state: { cursoId: curso.id },
          });
          EventEmitterService.get('boolean').emit(true);
        });
    }
  }
}
