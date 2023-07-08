import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResponsibleComponent } from './all-responsible.component';

describe('AllResponsibleComponent', () => {
  let component: AllResponsibleComponent;
  let fixture: ComponentFixture<AllResponsibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllResponsibleComponent]
    });
    fixture = TestBed.createComponent(AllResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
