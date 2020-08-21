import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsMainComponent } from './flights-main.component';

describe('FlightsMainComponent', () => {
  let component: FlightsMainComponent;
  let fixture: ComponentFixture<FlightsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
