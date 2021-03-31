import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  userform: FormGroup;
  private subscription: Subscription = new Subscription();

  showBtn: boolean;

  name: string;
  job: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.showBtn = false;
    this.createForm();
    this.onValueChanges();

  }

  createForm(): void {
    this.userform = this.fb.group({

      name: [null, [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
      job: [null, [Validators.pattern('^[a-zA-Z]+$'), Validators.required]]

    });
  }

  onClose(): void {
    this.userform.reset();
    this.dialogRef.close();
  }
  onClear(): void {
    this.userform.reset();
  }
  onValueChanges(): void {
    this.userform.valueChanges.subscribe(val => {
      if (this.userform.valid) {
        this.showBtn = true;
      }
      else {
        this.showBtn = false;
      }
    });
  }
  createUser(userData): any {
    return new Promise((resolve, reject) => {
      this.subscription.add(
        this.apiService.createUser(userData).subscribe(response => {
          if (response.status === 201) {
            Swal.fire(
              'Success!',
              `User created successfully.`,
              'success'
            ).then(() => {
              resolve(response.status);
              this.onClose();
            });

          }
          else{
            Swal.fire(
              'Error!',
              `User creation failed.`,
              'error'
            ).then(() => {
              reject();
              this.onClose();
            });
          }
        })
      );
    });
  }

  onSave(): void {
    const userData = {
      name: this.userform.value.name,
      job: this.userform.value.job
    };

    this.createUser(userData);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


