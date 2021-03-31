import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserResponse } from 'src/app/Models/User/UserResponse';
import { UserVM } from 'src/app/Models/User/userVM';
import API from '../../Services/ApiService/api-configuration.json';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response' as 'body',
  responseType: 'text' as 'json'

};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string;
  users: UserVM[];
  userResponse: UserResponse;


  constructor(private http: HttpClient) {
    this.baseUrl = API.BASE_URL;
  }

  setUrl(url: string): string {
    return this.baseUrl + url;
  }

  getUserList(pageId: number): Observable<any> {
    return this.http.get<UserResponse>
      (
        `${this.setUrl(API.usersList.replace('{id}', String(pageId)))}`,
        { observe: 'response' }
      ).pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<UserResponse>
      (
        `${this.setUrl(API.deleteUser.replace('{id}', String(userId)))}`,
        { observe: 'response' }
      ).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  createUser(userData): Observable<any> {
    return this.http.post<UserResponse>
      (
        `${this.setUrl(API.createUser)}`, userData,
        { observe: 'response' }
      ).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateUser(userData, userId): Observable<any> {

    return this.http.put<UserResponse>
      (
        `${this.setUrl(API.updateUser.replace('{id}', String(userId)))}`, userData,
        { observe: 'response' }
      ).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
      console.log(errorMessage);
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(errorMessage);
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
