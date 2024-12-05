import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { userreg } from '../_models/User/UserReg';
import { userCred } from '../_models/User/UserCred';
import { UserToken } from '../_models/User/userToke';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:7255';
  CurrentUser = signal<UserToken | null>(null);

  register(model: userreg) {
    return this.http
      .post<UserToken>(this.baseUrl + `/authUser/Register`, model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.CurrentUser.set(user);
          }
        })
      );
  }

  login(model: userCred) {
    return this.http
      .post<UserToken>(this.baseUrl + `/authUser/Login`, model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.CurrentUser.set(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.CurrentUser.set(null);
  }
}
