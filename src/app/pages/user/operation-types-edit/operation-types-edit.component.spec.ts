import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypesEditComponent } from './operation-types-edit.component';

describe('OperationTypesEditComponent', () => {
  let component: OperationTypesEditComponent;
  let fixture: ComponentFixture<OperationTypesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTypesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
