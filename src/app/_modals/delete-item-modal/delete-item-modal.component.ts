import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ItemService } from '../../_Services/item.service';

@Component({
  selector: 'app-delete-item-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-item-modal.component.html',
  styleUrl: './delete-item-modal.component.scss'
})
export class DeleteItemModalComponent {
  bsModalRef = inject(BsModalRef);
  title: string = '';
  id: number = 0;
  private itemService = inject(ItemService);




  onDeleteItem(): void {
    this.itemService.deleteItem(this.id).subscribe({
      next: () => {
        console.log('success');
      }
    });
  }




}
