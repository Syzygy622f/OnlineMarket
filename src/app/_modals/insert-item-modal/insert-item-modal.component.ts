import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-insert-item-modal',
  standalone: true,
  imports: [],
  templateUrl: './insert-item-modal.component.html',
  styleUrl: './insert-item-modal.component.scss'
})
export class InsertItemModalComponent {
  bsModalRef = inject(BsModalRef);
}
