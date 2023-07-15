import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCargoComponent } from './all-cargo.component';

describe('AllCargoComponent', () => {
  let component: AllCargoComponent;
  let fixture: ComponentFixture<AllCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCargoComponent]
    });
    fixture = TestBed.createComponent(AllCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
