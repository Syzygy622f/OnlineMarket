import { Component, inject } from '@angular/core';
import { UserService } from '../../_Services/user.service';
import { Card } from '../../_models/Card';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
})
export class CreditCardComponent {
  private userService = inject(UserService);
  model: Card = new Card();
  private toastr = inject(ToastrService);

  CreateCard() {
    this.userService.createCard(this.model).subscribe({
      next: () => {
        console.log(this.model);
      },
      error: (error) => this.toastr.error(error.error),
    });
  }
}
