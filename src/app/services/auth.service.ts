import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForRegister, UserForLogin } from '../model/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  addUser: any;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  // authUser(user: any) {
  //   let UserArray = [];
  //   if (localStorage.getItem('Users')) {
  //     UserArray = JSON.parse(localStorage.getItem('Users') || '{}');
  //   }
  //   return UserArray.find(
  //     (p: any) => p.userName === user.userName && p.password === user.password
  //   );
  // }
  authUser(user: UserForLogin): Observable<UserForLogin> {
    return this.http.post<UserForLogin>(this.baseUrl + '/account/login', user);
  }

  registerUser(user: UserForRegister) {
    return this.http.post<UserForRegister>(
      this.baseUrl + '/account/register',
      user
    );
  }
}
