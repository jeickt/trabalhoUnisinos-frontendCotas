import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[chamadaInexistente]',
})
export class ChamadaInexistenteDirective implements OnInit {
  @Input() chamadaInexistente: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.chamadaInexistente) {
      this.el.nativeElement.style.backgroundColor = 'gray';
    }
  }
}
