import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user.service';
import { Card } from '../../_models/User/Card';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteCardModalComponent } from '../../_modals/delete-card-modal/delete-card-modal.component';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
})
export class CreditCardComponent implements OnInit {
  bsDeleteModalRef: BsModalRef<DeleteCardModalComponent> =
    new BsModalRef<DeleteCardModalComponent>();
  private modalService = inject(BsModalService);

  private userService = inject(UserService);
  model: Card = new Card();
  ShowCards: Card[] = [];
  private toastr = inject(ToastrService);
  id: number = 0;

  ngOnInit(): void {
    this.getId();
    this.GetCards(this.id);
  }

  getId() {
    const userData = localStorage.getItem('user'); // Retrieve the 'user' data from local storage
    if (userData) {
      const user = JSON.parse(userData); // Parse the JSON string into an object
      console.log(user.userId);
      this.model.userId = user.userId;
      this.id= user.userId;
    }
    return null; // Return null if 'user' does not exist or is invalid
  }

  GetCards(id: number) {
    this.userService.GetCard(id).subscribe({
      next: (response) => {
        this.ShowCards = response;
      },
    });
  }

  OpenDeleteCardModal(id: number, title: string) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: title,
        id: id,
      },
    };
    this.bsDeleteModalRef = this.modalService.show(
      DeleteCardModalComponent,
      initialState
    );
  }

  CreateCard() {
    const date = new Date(this.model.expirationDate);

    date.setHours(date.getHours() + 3);

    this.model.expirationDate = date;

    this.userService.createCard(this.model).subscribe({
      next: () => {
        console.log(this.model);
      },
      error: (error) => this.toastr.error(error.error),
    });
  }
}
