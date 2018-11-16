import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraMileChargeComponent } from './extra-mile-charge.component';

describe('ExtraMileChargeComponent', () => {
  let component: ExtraMileChargeComponent;
  let fixture: ComponentFixture<ExtraMileChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraMileChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraMileChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
