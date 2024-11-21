import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  minSliderValue: number = 0;  // Initialize min slider value
  maxSliderValue: number = 100000;  // Initialize max slider value

  MinValueChanged(event: any) {
    this.minSliderValue = event.value || 0;
  }
  
  MaxValueChanged(event: any) {
    this.maxSliderValue = event.value || 100000;
    console.log(this.maxSliderValue);
  }

  updateSliderValues(type: string, value: number) {
    if (type === 'min') {
      this.minSliderValue = value < 0 ? 0 : value; // Ensure within range
    } else if (type === 'max') {
      this.maxSliderValue = value > 100000 ? 100000 : value; // Ensure within range
    }
  }

}
