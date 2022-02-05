import { EventEmitter } from '@angular/core';

export class EventEmitterService {
  private static emitters: {
    [inserirCursoEmNav: string]: EventEmitter<any>;
  } = {};

  static get(inserirCursoEmNav: string): EventEmitter<any> {
    if (!this.emitters[inserirCursoEmNav])
      this.emitters[inserirCursoEmNav] = new EventEmitter<any>();
    return this.emitters[inserirCursoEmNav];
  }
}
