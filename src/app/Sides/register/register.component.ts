import { Component, inject } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserpicModalComponent } from '../../_modals/userpic-modal/userpic-modal.component';
import { AccountService } from '../../_Services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userreg } from '../../_models/User/UserReg';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private modalService = inject(BsModalService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  bsModalRef: BsModalRef<UserpicModalComponent> =
    new BsModalRef<UserpicModalComponent>();
    private toastr = inject(ToastrService)
  model: userreg = new userreg();


  ngmodel = {
    password: '',
    confirmPassword: '',
  };
  passwordMismatch = false;



  register() {
    if (!this.passwordMismatch) {
      const date = new Date(this.model.dateOfBirth);

      date.setHours(date.getHours() + 3);
  
      this.model.dateOfBirth = date;
  
      this.accountService.register(this.model).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => this.toastr.error(error.error),
      });
    }
  }

  checkPasswords(password: string, confirmPassword: string): void {
    this.passwordMismatch = password !== confirmPassword;
  }


  openModal() {
    const initialState: ModalOptions = {
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      UserpicModalComponent,
      initialState
    );
  }
}
