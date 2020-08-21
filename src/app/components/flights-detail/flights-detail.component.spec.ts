import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsDetailComponent } from './flights-detail.component';

describe('FlightsDetailComponent', () => {
  let component: FlightsDetailComponent;
  let fixture: ComponentFixture<FlightsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
