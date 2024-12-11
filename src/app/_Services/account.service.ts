import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
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
  roles = computed(() => {
    const user = this.CurrentUser();
    if (user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).Role;
      console.log("role", role);
      return Array.isArray(role) ? role : [role];
    }
    return [];
  });

  register(model: userreg) {
    return this.http
      .post<UserToken>(this.baseUrl + `/authUser/Register`, model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.CurrentUser.set(user);
          }
        }),
        catchError((error) => {
          if (error.status === 400 && error.error.errors) {
            const errorMessages = error.error.errors;

            if (
              errorMessages.includes('Username is taken') ||
              errorMessages.includes('Email is already taken')
            ) {
              return throwError(
                () => new Error('Username or email is already taken.')
              );
            }
          }

          // Rethrow other errors
          return throwError(() => error);
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
        }),
        catchError((error) => {
          console.log('Full error object:', error);

          if (error.status === 401) {
            // tjekker på fejl status 401, for at kunne sende den response til component.ts
            const errorMessage = error.error || 'Invalid email or password';
            return throwError(() => ({
              status: 401,
              message: errorMessage,
            }));
          }

          // kaster alle andre fejl, som response tilbage
          return throwError(() => error);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.CurrentUser.set(null);
  }
}
