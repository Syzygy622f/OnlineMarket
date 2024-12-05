import { Component, inject, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditItemComponent } from '../../_modals/edit-item/edit-item.component';
import { DeleteItemModalComponent } from '../../_modals/delete-item-modal/delete-item-modal.component';
import { InsertItemModalComponent } from '../../_modals/insert-item-modal/insert-item-modal.component';
import { FormsModule } from '@angular/forms';
import { CreateItem } from '../../_models/Item/CreateItem';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../_Services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ShortItemInfo } from '../../_models/Item/ShortItemInfo';
import { ItemPhoto } from '../../_models/Item/ItemPhoto';
import { EditItem } from '../../_models/Item/EditItem';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [BsDropdownModule, FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit{
  private itemService = inject(ItemService);
  private modalService = inject(BsModalService);
  bsEditModalRef: BsModalRef<EditItemComponent> =
    new BsModalRef<EditItemComponent>();
  bsDeleteModalRef: BsModalRef<DeleteItemModalComponent> =
    new BsModalRef<DeleteItemModalComponent>();
  bsLinkModalRef: BsModalRef<InsertItemModalComponent> =
    new BsModalRef<InsertItemModalComponent>();

private toastr = inject(ToastrService);
  Items: ShortItemInfo[] = [];
  item: EditItem | null = null;
  createItem: CreateItem = new CreateItem();
  id: number = 0;


  ngOnInit(): void {
    this.getId();
    this.GetAllFromUserId();
  }

  getId() {
    const userData = localStorage.getItem('user'); // Retrieve the 'user' data from local storage
    if (userData) {
      const user = JSON.parse(userData); // Parse the JSON string into an object
      console.log(user.userId);
      this.createItem.userId = user.userId;
      this.id = user.userId;
    }
    return null; // Return null if 'user' does not exist or is invalid
  }

GetAllFromUserId(){
  this.itemService.GetAllFromUserId(this.id).subscribe({
    next: response => {
      this.Items = response;
    },
    error: (error) => this.toastr.error(error.error)
  })
}

getMainPhoto(photos: ItemPhoto[]): string {
  if (!photos || photos.length === 0) {
    return 'path/to/default/image.jpg'; // Fallback image
  }
  const mainPhoto = photos.find(photo => photo.isMain);
  return mainPhoto ? mainPhoto.url : 'path/to/default/image.jpg';
}


  addPhoto(): void {
    this.createItem.photos.push({ id: 0, url: '', isMain: false }); // Add a new ItemPhoto
  }

  removePhoto(index: number): void {
    this.createItem.photos.splice(index, 1); // Remove the ItemPhoto at the given index
  }

  submitForm(): void {
    this.itemService.CreateItem(this.createItem).subscribe({
      next: () => {
        console.log(this.createItem);
      },
      error: (error) =>  this.toastr.error(error.error),
    });
  }

  openEditModal(item: ShortItemInfo) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        item: item,
      },
    };
    this.bsEditModalRef = this.modalService.show(
      EditItemComponent,
      initialState
    );
  }
  openRemoveModal(title: string, id: number) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: title,
        id: id,
      },
    };
    this.bsDeleteModalRef = this.modalService.show(
      DeleteItemModalComponent,
      initialState
    );
  }

  openLinkModal() {
    const initialState: ModalOptions = {
      class: 'modal-lg',
    };
    this.bsLinkModalRef = this.modalService.show(
      InsertItemModalComponent,
      initialState
    );
  }
}
