import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { UserResponse } from 'src/app/Models/User/UserResponse';
import { UserVM } from 'src/app/Models/User/userVM';
import { ApiService } from 'src/app/Services/ApiService/api.service';
import { BroadcastService } from 'src/app/Services/BroadcastService/broadcast.service';
import Swal from 'sweetalert2';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserVM[] = [];
  userResponse: UserResponse;
  displayedColumns: string[] = ['fname', 'lname', 'email', 'avatar', 'view', 'edit', 'delete'];
  private subscription: Subscription = new Subscription();

  dataSource = [];
  length = 0;
  pageSize = 0;
  pEvent: PageEvent;
  currentPId = 1;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private broadcastService: BroadcastService
    ) {
  }

  ngOnInit(): void {

    this.getUsersList(1);

  }

  getUsersList(pageId: number): any {

    return new Promise((resolve, reject) => {
      this.subscription.add(
        this.apiService.getUserList(pageId).subscribe(userList => {

          if (userList.status === 200) {
            console.log(userList.body);
            this.userResponse = userList.body;
            this.length = this.userResponse.total;
            this.pageSize = this.userResponse.per_page;
            this.users = this.userResponse.data;
            resolve(userList.staus);
          }
          else {
            reject();
          }
        })
      );
    });
  }
  getPaginatedUserList(event): void {
    this.getUsersList(event.pageIndex + 1);
  }

  redirectToCreateUser(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateUserComponent, dialogConfig);
  }

  redirectToUpdateUser(element): void {
    this.broadcastService.broadcastUpdateUserData(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UpdateUserComponent, dialogConfig);
  }

  deleteUser(element): any {

    console.log(element);
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Confirm deletion',
        text: 'Are you sure want to delete this permanently?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#269c61',
        cancelButtonColor: '#c23232',
        confirmButtonText: 'Delete'
      }).then((result) => {

        if (result.isConfirmed) {
          this.subscription.add(
            this.apiService.deleteUser(element.id).subscribe(response => {

              if (response.status === 204) {

                Swal.fire({
                  title: 'User deleted Successfully',
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#269c61',
                }).then(func => {
                  this.getUsersList(this.currentPId);
                  resolve(response.status);
                }

                );

              }
              else {
                Swal.fire({
                  title: response.status,
                  text: 'User deletion failed, please try again.',
                  icon: 'error',
                });
                reject();
              }

            })
          );
        }

      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
