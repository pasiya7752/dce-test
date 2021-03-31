import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserVM } from 'src/app/Models/User/userVM';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  userVm = {} as UserVM;

  private userBS = new BehaviorSubject(this.userVm);

  userModelOb = this.userBS.asObservable();
  constructor() { }

  broadcastUpdateUserData(user: UserVM): void {
    this.userBS.next(user);
  }
}
