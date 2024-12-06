import { Component, inject } from '@angular/core';
import { AccountService } from '../../_Services/account.service';
import { userCred } from '../../_models/User/UserCred';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private accountService = inject(AccountService);
  private route = inject(Router);
  model: userCred = new userCred();

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.route.navigate(['/']);
      },
      error: (error) => console.log(error.error),
    });
  }
}
