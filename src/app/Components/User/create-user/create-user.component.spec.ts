import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let debug: DebugElement;
  let dialog: MatDialog

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: dialog }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    debug = fixture.debugElement.query(By.css('update-user'));
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

  it('form should be valid', async () => {
    component.userform.controls['name'].setValue('David');
    component.userform.controls['job'].setValue('Software Engineer');
    expect(component.userform.valid).toBeTruthy();
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
