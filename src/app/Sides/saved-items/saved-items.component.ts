import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user.service';
import { ShortItemInfo } from '../../_models/Item/ShortItemInfo';
import { ItemPhoto } from '../../_models/Item/ItemPhoto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-items.component.html',
  styleUrl: './saved-items.component.scss',
})
export class SavedItemsComponent implements OnInit {
  private userService = inject(UserService);
  items: ShortItemInfo[] = [];

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    const userData = localStorage.getItem('user'); // Retrieve the 'user' data from local storage
    if (userData) {
      const user = JSON.parse(userData); // Parse the JSON string into an object
      console.log(user.userId);
      this.getall(user.userId);
    }
    return null; // Return null if 'user' does not exist or is invalid
  }

  getall(id: number) {
    this.userService.GetSaveList(id).subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => console.log(error.error),
    });
  }

  getMainPhoto(photos: ItemPhoto[]): string {
    if (!photos || photos.length === 0) {
      return 'path/to/default/image.jpg'; // Fallback image
    }
    const mainPhoto = photos.find((photo) => photo.isMain);
    return mainPhoto ? mainPhoto.url : 'path/to/default/image.jpg';
  }
}
