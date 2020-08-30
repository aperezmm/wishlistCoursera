import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appSpyOnMe]'
})
export class SpyOnMeDirective implements OnInit, OnDestroy {
  static nextId = 0;

  log = (msg: string) => console.log(`Evento #${++SpyOnMeDirective.nextId} ${msg}`);

  ngOnInit() {
    this.log(`########======> OnInit`);
  }

  ngOnDestroy(){
    this.log(`########=======> OnDestroy`);
  }
  constructor() { }

}
