import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelResponsibleComponent } from './excel-responsible.component';

describe('ExcelResponsibleComponent', () => {
  let component: ExcelResponsibleComponent;
  let fixture: ComponentFixture<ExcelResponsibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelResponsibleComponent]
    });
    fixture = TestBed.createComponent(ExcelResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
