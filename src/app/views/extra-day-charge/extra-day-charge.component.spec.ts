import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraDayChargeComponent } from './extra-day-charge.component';

describe('ExtraDayChargeComponent', () => {
  let component: ExtraDayChargeComponent;
  let fixture: ComponentFixture<ExtraDayChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraDayChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraDayChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
