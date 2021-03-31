import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let debug: DebugElement;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('update-user'));
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async () => {
    component.userform.controls['name'].setValue('');
    component.userform.controls['job'].setValue('');
    expect(component.userform.valid).toBeFalsy();
  });

  it('form should be invalid', async () => {
    component.userform.controls['name'].setValue('David');
    component.userform.controls['job'].setValue('Software Engineer');
    expect(component.userform.valid).toBeTruthy();
  });

  it('user create httpResponse status must be equal to 201', async () => {
    const testUserData = {
      name: 'testName',
      job: 'testJob'
    };
    component.createUser(testUserData).then(status => {
      expect(status).toEqual(201);
    });
  });

  it('save button should be kept disabled until the form is valid', async () => {
    if (component.userform.valid)
    {
      expect(component.showBtn).toBeTruthy();
    }
    else
    {
      expect(component.showBtn).toBeFalsy();
    }
  });


});
