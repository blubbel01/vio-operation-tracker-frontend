import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCreateComponent } from './operations-create.component';

describe('OperationsCreateComponent', () => {
  let component: OperationsCreateComponent;
  let fixture: ComponentFixture<OperationsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
