import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsManageComponent } from './operations-manage.component';

describe('OperationsManageComponent', () => {
  let component: OperationsManageComponent;
  let fixture: ComponentFixture<OperationsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
