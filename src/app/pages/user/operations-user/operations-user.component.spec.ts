import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsUserComponent } from './operations-user.component';

describe('OperationsUserComponent', () => {
  let component: OperationsUserComponent;
  let fixture: ComponentFixture<OperationsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
