import { Component, inject, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ItemService } from '../../_Services/item.service';
import { ItemPhoto } from '../../_models/Item/ItemPhoto';
import { RouterLink } from '@angular/router';
import { item } from '../../_models/Item/Item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule, MatInputModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  private itemService = inject(ItemService);
  minValue: number = 0; // Default min value
  maxValue: number = 100; // Default max value
  items: item[] = [];

ngOnInit(): void {
  this.getall();
}

  getall() {
    this.itemService.getAll().subscribe({
      next: response => {
        this.items = response;
      },
      error: error => console.log(error.error)
    });
  }

  getMainPhoto(photos: ItemPhoto[]): string {
    if (!photos || photos.length === 0) {
      return 'path/to/default/image.jpg'; // Fallback image
    }
    const mainPhoto = photos.find(photo => photo.isMain);
    return mainPhoto ? mainPhoto.url : 'path/to/default/image.jpg';
  }



  onInputChange(): void {
    // Ensure the slider value is within the updated range

  }
}
