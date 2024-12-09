import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  register(model: userreg) {
    return this.http.post<UserToken>(this.baseUrl + `/authUser/Register`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUser.set(user);
        }
      }),
      catchError((error) => {
        if (error.status === 400 && error.error.errors) {
          const errorMessages = error.error.errors;
      
          if (errorMessages.includes("Username is taken") || errorMessages.includes("Email is already taken")) {
            return throwError(() => new Error("Username or email is already taken."));
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
          console.log("Full error object:", error);
        
          if (error.status === 401) {
            // Handle plain text error response from backend
            const errorMessage = error.error || "Invalid email or password";
            return throwError(() => ({
              status: 401,
              message: errorMessage,
            }));
          }
        
          // Rethrow other errors as-is
          return throwError(() => error);
        }),
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.CurrentUser.set(null);
  }
}
