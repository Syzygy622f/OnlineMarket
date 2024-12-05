import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ItemService } from '../../_Services/item.service';
import { ShortItemInfo } from '../../_models/Item/ShortItemInfo';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent {
bsModalRef = inject(BsModalRef);
item: ShortItemInfo = new ShortItemInfo();
private itemService = inject(ItemService);

update(){
  this.itemService.updateItem(this.item).subscribe({ //case sensitiv tjek swagger og model du bruger
    next: (response) =>{
      console.log(response);
    }
  });

}
hideModal(){
  this.bsModalRef.hide();
}
}
