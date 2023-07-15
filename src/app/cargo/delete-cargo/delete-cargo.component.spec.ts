import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCargoComponent } from './delete-cargo.component';

describe('DeleteCargoComponent', () => {
  let component: DeleteCargoComponent;
  let fixture: ComponentFixture<DeleteCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCargoComponent]
    });
    fixture = TestBed.createComponent(DeleteCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
