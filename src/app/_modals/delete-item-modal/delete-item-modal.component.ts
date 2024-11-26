import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-item-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-item-modal.component.html',
  styleUrl: './delete-item-modal.component.scss'
})
export class DeleteItemModalComponent {
  bsModalRef = inject(BsModalRef);
}
