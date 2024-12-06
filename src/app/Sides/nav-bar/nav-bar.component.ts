import { Component, inject } from '@angular/core';
import {
  RouterLink,
} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../../_Services/account.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [BsDropdownModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private accountService = inject(AccountService);

  logout() {
    this.accountService.logout();
  }
}
