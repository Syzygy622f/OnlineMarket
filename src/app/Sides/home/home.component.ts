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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private itemService = inject(ItemService);
  minValue: number = 0; // Default min value
  maxValue: number = 0; // Default max value
  items: item[] = [];
  loading: boolean = false; // Loading flag
  isFilterEnabled: boolean = false; // Track whether filtering is active

  ngOnInit(): void {
    this.getall();
  }

  getall() {
    this.loading = true; // Start the loader
    this.itemService.getAll().subscribe({
      next: (response) => {
        this.items = response;
        this.loading = false; // Stop the loader
      },
      error: (error) => {
        console.log(error.error);
        this.loading = false; // Stop the loader even if there's an error
      },
    });
  }

  getMainPhoto(photos: ItemPhoto[]): string {
    if (!photos || photos.length === 0) {
      return 'path/to/default/image.jpg'; // Fallback image
    }
    const mainPhoto = photos.find((photo) => photo.isMain);
    return mainPhoto ? mainPhoto.url : 'path/to/default/image.jpg';
  }

  filterItems(item: item): boolean {
    if (!this.isFilterEnabled) {
      return true; // Show all items when filtering is disabled
    }
    const meetsMin = item.price >= this.minValue;
    const meetsMax = item.price <= this.maxValue;
    return meetsMin && meetsMax;
  }

  applyFilter() {
    this.isFilterEnabled = true; // Enable the filter
  }

  resetFilter() {
    this.isFilterEnabled = false; // Disable the filter
    this.minValue = 0;
    this.maxValue = 0;
  }
}
