import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user.service';
import { UserInfo } from '../../_models/UserInfo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  map, Observable, tap } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
private userService = inject(UserService);
model$: Observable<UserInfo> = new Observable<UserInfo>; 
updateModel: UserInfo = new UserInfo();
model: UserInfo = new UserInfo();
id:number = 0;

  ngOnInit(): void {
    this.getId();
    this.get();
    this.model$.subscribe((model) => {
      console.log(model);
    });
  }


  getId(){
    const userData = localStorage.getItem('user'); // Retrieve the 'user' data from local storage
  if (userData) {
    const user = JSON.parse(userData); // Parse the JSON string into an object
    console.log(user.userId);
    this.id = user.userId;
  }
  return null; // Return null if 'user' does not exist or is invalid
  }


  get(){
    this.model$ = this.userService.getOne(this.id).pipe(
      map(user => ({
        ...user,
        livingplace:{
          id: user.livingplace.id,
          city: user.livingplace.city || 'unknown',
          postCode: user.livingplace?.postCode || 0,
          address: user.livingplace?.address || 'not specified',
        },
      }))
    );
  }

}
