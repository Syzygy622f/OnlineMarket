import { Component, inject, OnInit } from '@angular/core';
import {
  RouterLink,
} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../../_Services/account.service';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from '../../_directives/has-role.directive';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [BsDropdownModule, RouterLink, CommonModule, HasRoleDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent{
  accountService = inject(AccountService);

  logout() {
    this.accountService.logout();
  }
}
