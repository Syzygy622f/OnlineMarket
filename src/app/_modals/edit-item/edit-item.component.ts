import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { edititem } from '../../_models/editItem';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent {
bsModalRef = inject(BsModalRef);
item: edititem | null = null;
}
