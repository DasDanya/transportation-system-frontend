import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponsibleComponent } from './add-responsible.component';

describe('AddResponsibleComponent', () => {
  let component: AddResponsibleComponent;
  let fixture: ComponentFixture<AddResponsibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResponsibleComponent]
    });
    fixture = TestBed.createComponent(AddResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
