import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWarehouseComponent } from './all-warehouse.component';

describe('AllWarehouseComponent', () => {
  let component: AllWarehouseComponent;
  let fixture: ComponentFixture<AllWarehouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllWarehouseComponent]
    });
    fixture = TestBed.createComponent(AllWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
