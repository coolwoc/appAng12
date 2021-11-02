import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "@src/src/environments/environment.prod";
import { Observable, Subject } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

import { Router } from "@angular/router";

import { JwtTokenDto } from "@src/src/app/models/Dto/JwtTokenDto";
import * as fromUser from '@src/src/app/models/User';

const AUTH_API_LOGIN: string = environment.apiUrl + `${'/api/v1/auth/log-in'}`;
const AUTH_API_REGISTER: string = environment.apiUrl + `${'/api/v1/auth/sign-up'}`;
const AUTH_API_ME: string = environment.apiUrl + `${'/api/v1/users/me'}`;

const TOKEN_KEY: string = 'auth-token';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  meData = new Subject<fromUser.User>();
  credentials!: any;
  userData!: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: fromUser.EmailPasswordCredentials, password: fromUser.EmailPasswordCredentials): Observable<JwtTokenDto> {
    this.credentials=this.http.post<JwtTokenDto>(AUTH_API_LOGIN, {
      email,
      password
    }, httpOptions);
    return this.credentials;
  }

  logOut():void {
    window.sessionStorage.clear();
    this.authChange.next(false);
    this.router.navigate(['auth/login']);
  }
  
  registerUser(name: fromUser.User, surname: fromUser.User, email: fromUser.User, password: fromUser.User): Observable<any> {
    this.userData=this.http.post<any>(AUTH_API_REGISTER, {
      name,
      surname,
      email,
      password
    }, httpOptions);
    return this.userData;
  }

  getMeInfo(): Observable<any> {
    return this.http.get<fromUser.User>(AUTH_API_ME, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn() {
    let authToken = sessionStorage.getItem('auth-token');
    return (authToken !== null) ? true : false;
  }

  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['users']);
  }

  unAuthorized() {
    this.authChange.next(false);
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['auth/login']);
  }

  registerUserSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['static/welcome']);
  }

  isRegisters() {
    let authToken = sessionStorage.getItem('auth-token');
    authToken ? this.authChange.next(true) : this.authChange.next(false);
     
  }

  userAuthSuccesfully() {
    let isLogged = this.isLoggedIn();
    if (isLogged) {
      this.authChange.next(true);
      this.router.navigate(['users']);
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  handleError(error: any): any {
    return console.log(error);
  }
}
