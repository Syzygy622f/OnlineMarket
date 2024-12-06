import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../_Services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {}
