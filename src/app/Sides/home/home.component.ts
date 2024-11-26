import { Component, inject } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { item } from '../../_models/Item';
import { ItemService } from '../../_Services/item.service';
import { ItemPhoto } from '../../_models/ItemPhoto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private itemService = inject(ItemService);
  minValue: number = 0; // Default min value
  maxValue: number = 100; // Default max value
  sliderValue: number = 50; // Default slider value
  items: item[] = [];

  getall() {
    this.itemService.getAll().subscribe({
      next: response => {
        console.log(response);
        this.items = response;
      },
      error: error => console.log(error.error)
    });
  }

  getMainPhoto(photos: ItemPhoto[]): string {
    const mainPhoto = photos.find(photo => photo.IsMain);
    return mainPhoto ? mainPhoto.url : 'path/to/default/image.jpg'; // Fallback if no main photo
  }



  onInputChange(): void {
    // Ensure the slider value is within the updated range
    if (this.sliderValue < this.minValue) {
      this.sliderValue = this.minValue;
    } else if (this.sliderValue > this.maxValue) {
      this.sliderValue = this.maxValue;
    }
  }
}
