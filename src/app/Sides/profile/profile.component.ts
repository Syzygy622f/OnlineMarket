import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../_models/User/UserInfo';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  updateModel: UserInfo = new UserInfo();
  model: UserInfo = new UserInfo();
  birtDate: string = '';
  id: number = 0;

  ngOnInit(): void {
    this.getId();
    this.get();
  }

  getId() {
    const userData = localStorage.getItem('user'); // Retrieve the 'user' data from local storage
    if (userData) {
      const user = JSON.parse(userData); // Parse the JSON string into an object
      console.log(user.userId);
      this.id = user.userId;
      this.updateModel.id = user.userId;
    }
    return null; // Return null if 'user' does not exist or is invalid
  }

  get() {
    this.userService.getOne(this.id).subscribe({
      next: (response) => {
        if (response.dateOfBirth) {
          this.birtDate = new Date(response.dateOfBirth).toLocaleDateString();
        }

        this.model = response;
        console.log(this.model);
      },
    });
  }

  update() {
    const date = new Date(this.model.dateOfBirth);

    date.setHours(date.getHours() + 3);

    this.model.dateOfBirth = date;

    this.userService.updateUser(this.updateModel).subscribe({
      next: (response) => {
        console.log(response);
      },
    });

    console.log('model', this.updateModel);
  }
}
