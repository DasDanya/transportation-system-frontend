import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelWarehouseComponent } from './excel-warehouse.component';

describe('ExcelWarehouseComponent', () => {
  let component: ExcelWarehouseComponent;
  let fixture: ComponentFixture<ExcelWarehouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelWarehouseComponent]
    });
    fixture = TestBed.createComponent(ExcelWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
