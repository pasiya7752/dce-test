import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { UpdateUserComponent } from './update-user.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let debug: DebugElement;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UpdateUserComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('update-user'));
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form should be invalid', async () => {
    component.userform.controls['firstname'].setValue('');
    component.userform.controls['lastname'].setValue('');
    component.userform.controls['email'].setValue('');
    component.userform.controls['job'].setValue('');
    expect(component.userform.valid).toBeFalsy();
  });

  it('form should be invalid', async () => {
    component.userform.controls['firstname'].setValue('David');
    component.userform.controls['lastname'].setValue('Michell');
    component.userform.controls['email'].setValue('david.michel@gmail.com');
    component.userform.controls['job'].setValue('Software Engineer');
    expect(component.userform.valid).toBeTruthy();
  });

  it('user update httpResponse status must be equal to 200', async () => {
    const testUserData = {
      name: 'testName',
      job: 'testJob'
    };
    component.updateUser(testUserData).then(status => {
      expect(status).toEqual(200);
    });
  });

  it('save button should be kept disabled until the form is valid', async () => {
    if (component.userform.valid) {
      expect(component.showBtn).toBeTruthy();
    }
    else {
      expect(component.showBtn).toBeFalsy();
    }
  });


});
