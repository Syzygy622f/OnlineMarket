import { Component, inject, NgModule } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserpicModalComponent } from '../../_modals/userpic-modal/userpic-modal.component';
import { AccountService } from '../../_Services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userreg } from '../../_models/UserReg';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private modalService = inject(BsModalService);
private accountService = inject(AccountService);
//private router = inject(Router);
bsModalRef: BsModalRef<UserpicModalComponent> = new BsModalRef<UserpicModalComponent>();
model: userreg = new userreg();

register(){
  this.accountService.register(this.model).subscribe({
    next: () => {
      console.log(this.model);
      //this.router.navigate(['/']);
    },
    error: error => console.log(this.model)
  });
}


  openModal(){
    const initialState: ModalOptions = {
      class: 'modal-lg',
    }
    this.bsModalRef = this.modalService.show(UserpicModalComponent, initialState);
  }
}
