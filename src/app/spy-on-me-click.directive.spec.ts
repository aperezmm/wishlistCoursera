import { SpyOnMeClickDirective } from './spy-on-me-click.directive';
import { ElementRef } from '@angular/core';

describe('SpyOnMeClickDirective', () => {
  it('should create an instance', () => {
    const directive = new SpyOnMeClickDirective(new ElementRef({}));
    expect(directive).toBeTruthy();
  });
});