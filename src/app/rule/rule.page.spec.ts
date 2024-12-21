import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulePage } from './rule.page';

describe('RulePage', () => {
  let component: RulePage;
  let fixture: ComponentFixture<RulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
