import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../_Services/account.service';
import { userCred } from '../../_models/User/UserCred';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private accountService = inject(AccountService);
model: userCred = new userCred();



login(){
  console.log(this.model);
  this.accountService.login(this.model).subscribe({
    next: response => {
      console.log(this.model);
      console.log(response);
    },
    error: error => console.log(error.error)
  });
}




}
