import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[chamadaSelecionada]',
})
export class ChamadaSelecionadaDirective implements OnInit {
  @Input() chamadaSelecionada: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.chamadaSelecionada) {
      this.el.nativeElement.style.backgroundColor = '#007FFF';
    }
  }
}
