import { Component, inject } from '@angular/core';
import { AccountService } from '../../_Services/account.service';
import { userCred } from '../../_models/User/UserCred';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);
  model: userCred = new userCred();

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.route.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error(error.message || 'An unknown error occurred');
      },
    });
  }
}
