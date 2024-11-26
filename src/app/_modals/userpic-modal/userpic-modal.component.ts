import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-userpic-modal',
  standalone: true,
  imports: [],
  templateUrl: './userpic-modal.component.html',
  styleUrl: './userpic-modal.component.scss'
})
export class UserpicModalComponent {
  bsModalRef = inject(BsModalRef);
}
