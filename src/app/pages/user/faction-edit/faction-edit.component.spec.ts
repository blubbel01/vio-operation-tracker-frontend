import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionEditComponent } from './faction-edit.component';

describe('FactionEditComponent', () => {
  let component: FactionEditComponent;
  let fixture: ComponentFixture<FactionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
