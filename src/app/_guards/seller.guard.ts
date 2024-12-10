import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_Services/account.service';
import { ToastrService } from 'ngx-toastr';

export const sellerGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);


  if (accountService.roles().includes("Seller") || accountService.roles().includes("User")) {
    return true;
  } else{
    toastr.error('du bruge ikke være her');
    return false;
  }
};
