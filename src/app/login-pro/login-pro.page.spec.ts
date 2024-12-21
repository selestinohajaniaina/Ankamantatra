import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginProPage } from './login-pro.page';

describe('LoginProPage', () => {
  let component: LoginProPage;
  let fixture: ComponentFixture<LoginProPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
