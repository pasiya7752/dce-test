import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserVM } from 'src/app/Models/User/userVM';
import { ApiService } from 'src/app/Services/ApiService/api.service';
import { BroadcastService } from 'src/app/Services/BroadcastService/broadcast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  firstName: string;
  lastName: string;
  email: string;
  updatingUser: UserVM;
  showBtn: boolean;
  private subscription: Subscription = new Subscription();


  userform: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private apiService: ApiService,
    private broadcastService: BroadcastService,
  ) { }

  ngOnInit(): void {

    this.getUpdatingUserDetails();
    this.createUserForm();
    this.showBtn = false;

  }

  createUserForm(): void {
    this.userform = this.fb.group({

      firstname: [this.updatingUser.first_name, [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
      lastname: [this.updatingUser.last_name, [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
      email: [this.updatingUser.email, [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
      job: ['Software Engineer', [Validators.pattern('^[a-z A-Z]+$'), Validators.required]],

    });
  }

  getUpdatingUserDetails(): void {

    this.broadcastService.userModelOb.subscribe(data => {
      this.updatingUser = data;
    });
  }

  onValueChanges(): void {
    this.subscription.add(
      this.userform.valueChanges.subscribe(val => {
        if (this.userform.valid) {
          this.showBtn = true;
        }
        else {
          this.showBtn = false;
        }
      })
    );
  }

  onClose(): void {
    this.userform.reset();
    this.dialogRef.close();
  }
  onClear(): void {
    this.userform.reset();
  }
  onSave(): void {
    const userData = {
      name: this.userform.value.firstname + ' ' + this.userform.value.lastname,
      job: this.userform.value.job
    };

    this.updateUser(userData);
  }
  updateUser(userData): any {

    return new Promise((resolve, reject) => {
      this.subscription.add(
        this.apiService.updateUser(userData, this.updatingUser.id).subscribe(response => {

          if (response.status === 200) {
            Swal.fire(
              'Success!',
              `User updated successfully.`,
              'success'
            ).then(() => {
              resolve(response.status);
              this.onClose();
            });
          }
          else {
            Swal.fire(
              'Error!',
              `User update failed.`,
              'error'
            ).then(() => {
              reject();
              this.onClose();
            });
          }

        }));
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
