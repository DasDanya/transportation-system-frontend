import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCargoComponent } from './update-cargo.component';

describe('UpdateCargoComponent', () => {
  let component: UpdateCargoComponent;
  let fixture: ComponentFixture<UpdateCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCargoComponent]
    });
    fixture = TestBed.createComponent(UpdateCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
