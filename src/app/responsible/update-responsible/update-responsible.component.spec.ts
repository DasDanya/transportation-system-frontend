import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResponsibleComponent } from './update-responsible.component';

describe('UpdateResponsibleComponent', () => {
  let component: UpdateResponsibleComponent;
  let fixture: ComponentFixture<UpdateResponsibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateResponsibleComponent]
    });
    fixture = TestBed.createComponent(UpdateResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
