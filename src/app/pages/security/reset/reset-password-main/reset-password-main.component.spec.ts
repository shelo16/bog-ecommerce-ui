import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordMainComponent } from './reset-password-main.component';

describe('ResetPasswordMainComponent', () => {
  let component: ResetPasswordMainComponent;
  let fixture: ComponentFixture<ResetPasswordMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
