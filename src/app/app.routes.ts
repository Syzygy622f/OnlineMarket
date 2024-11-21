import { Routes } from '@angular/router';
import { HomeComponent } from './Sides/home/home.component';
import { AccountComponent } from './Sides/account/account.component';
import { ItemComponent } from './Sides/item/item.component';
import { ItemViewComponent } from './Sides/item-view/item-view.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'Account', component: AccountComponent},
    {path: 'Items', component: ItemComponent},
    {path: 'ViewItem/:id', component: ItemViewComponent},
    {path: '*', component: HomeComponent, pathMatch: 'full'},
];
