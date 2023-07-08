import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResponsibleComponent } from './delete-responsible.component';

describe('DeleteResponsibleComponent', () => {
  let component: DeleteResponsibleComponent;
  let fixture: ComponentFixture<DeleteResponsibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteResponsibleComponent]
    });
    fixture = TestBed.createComponent(DeleteResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
