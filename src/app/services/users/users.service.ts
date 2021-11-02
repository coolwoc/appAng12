import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/src/environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as fromUser from '@src/src/app/models/User';

const AUTH_API_USERS: string = environment.apiUrl + `${'/api/v1/users'}`;
const AUTH_API_USERS_DELETE: string = environment.apiUrl + `${'/api/v1/users/'}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(
    public http: HttpClient
  ) { }

  errorObject!: any;

  getAllUsers(): Observable<any> {
    return this.http.get<fromUser.User[]>(AUTH_API_USERS, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete(AUTH_API_USERS_DELETE + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: any): any {
    return throwError(error);
  }
}
