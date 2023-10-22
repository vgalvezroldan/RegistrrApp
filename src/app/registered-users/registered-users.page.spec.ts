import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredUsersPage } from './registered-users.page';

describe('RegisteredUsersPage', () => {
  let component: RegisteredUsersPage;
  let fixture: ComponentFixture<RegisteredUsersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisteredUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
