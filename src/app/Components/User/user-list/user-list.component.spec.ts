import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get users httpResponse status must be equal to 200', async () => {
    const pageId = 1;
    component.getUsersList(pageId).then(status => {
      expect(status).toEqual(200);
    });
  });

  it('delete user httpResponse status must be equal to 204', async () => {
    const userElement = {
      id: 2
    };
    component.deleteUser(userElement).then(status => {
      expect(status).toEqual(204);
    });
  });

});
