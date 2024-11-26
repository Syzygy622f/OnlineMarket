import { Component, inject } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserpicModalComponent } from '../../_modals/userpic-modal/userpic-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private modalService = inject(BsModalService);
bsModalRef: BsModalRef<UserpicModalComponent> = new BsModalRef<UserpicModalComponent>();

  openModal(){
    console.log("hej")
    const initialState: ModalOptions = {
      class: 'modal-lg',
    }
    this.bsModalRef = this.modalService.show(UserpicModalComponent, initialState);
  }
}
