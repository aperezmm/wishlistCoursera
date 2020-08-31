import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appSpyOnMeClick]'
})
export class SpyOnMeClickDirective {

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    //HTML
    this.element = elRef.nativeElement;

    //Cada click
    fromEvent(this.element, 'click').subscribe(event => this.trackClick(event));
  }

  trackClick(event: Event):void{
    const elemTags = this.element.attributes.getNamedItem('data-trackear-click-tags').value.split(' ');
    console.log(`|||||||||=========> trackClick event: "${elemTags}"`);
  }

}
