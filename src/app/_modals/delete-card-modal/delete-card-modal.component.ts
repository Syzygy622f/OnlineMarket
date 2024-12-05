import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../_Services/user.service';

@Component({
  selector: 'app-delete-card-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-card-modal.component.html',
  styleUrl: './delete-card-modal.component.scss',
})
export class DeleteCardModalComponent {
  bsModalRef = inject(BsModalRef);
  title: string = '';
  id: number = 0;

  private userService = inject(UserService);

  OnDeleteCard(): void {
    this.userService.DeleteCard(this.id).subscribe({
      next: () => {
        console.log('success');
        this.bsModalRef.hide();
      },
    });
  }
}
