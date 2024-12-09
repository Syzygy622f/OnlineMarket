import { Routes } from '@angular/router';
import { HomeComponent } from './Sides/home/home.component';
import { ItemComponent } from './Sides/item/item.component';
import { ItemViewComponent } from './Sides/item-view/item-view.component';
import { LoginComponent } from './Sides/login/login.component';
import { RegisterComponent } from './Sides/register/register.component';
import { AccountComponent } from './Sides/account/account.component';
import { ProfileComponent } from './Sides/profile/profile.component';
import { CreditCardComponent } from './Sides/credit-card/credit-card.component';
import { SavedItemsComponent } from './Sides/saved-items/saved-items.component';
import { sellerGuard } from './_guards/seller.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Items', component: ItemComponent, canActivate: [sellerGuard]},
  {
    path: 'Account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'Profile', pathMatch: 'full' },
      { path: 'Profile', component: ProfileComponent },
      { path: 'CreditCard', component: CreditCardComponent },
      { path: 'SavedItems', component: SavedItemsComponent },
    ],
  },
  { path: 'ViewItem/:id', component: ItemViewComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

  { path: '*', component: HomeComponent, pathMatch: 'full' },
];
