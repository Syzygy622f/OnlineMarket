import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { item } from '../_models/Item';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
private http = inject(HttpClient);
baseUrl = "https://localhost:7255"
CurrentItem = signal<item | null>(null);




getAll(): Observable<item[]> {
  return this.http.get<item[]>(this.baseUrl + '/getAll').pipe(
    map(items => {
      if (items && Array.isArray(items) && items.length > 0) {
        return items; // Return the array of items
      }
      return []; // Return an empty array if no items are found or response is not valid
    })
  );
}


}
