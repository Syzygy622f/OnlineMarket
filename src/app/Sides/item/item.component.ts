import { Component, inject } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditItemComponent } from "../../_modals/edit-item/edit-item.component";
import { edititem } from '../../_models/editItem';
import { DeleteItemModalComponent } from '../../_modals/delete-item-modal/delete-item-modal.component';
import { InsertItemModalComponent } from '../../_modals/insert-item-modal/insert-item-modal.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [BsDropdownModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
private modalService = inject(BsModalService);
bsEditModalRef: BsModalRef<EditItemComponent> = new BsModalRef<EditItemComponent>();
bsDeleteModalRef: BsModalRef<DeleteItemModalComponent> = new BsModalRef<DeleteItemModalComponent>();
bsLinkModalRef: BsModalRef<InsertItemModalComponent> = new BsModalRef<InsertItemModalComponent>();
item: edititem | null = null

openEditModal(){
  const initialState: ModalOptions = {
    class: 'modal-lg',
    initialState:{
      item: this.item,
    }
  }
  this.bsEditModalRef = this.modalService.show(EditItemComponent, initialState);
}
openRemoveModal(){
  const initialState: ModalOptions = {
    class: 'modal-lg',
    initialState:{
      title: this.item?.title,
    }
  }
  this.bsDeleteModalRef = this.modalService.show(DeleteItemModalComponent, initialState);
}

openLinkModal(){
  const initialState: ModalOptions = {
    class: 'modal-lg',
  }
  this.bsLinkModalRef = this.modalService.show(InsertItemModalComponent, initialState);
}
}
