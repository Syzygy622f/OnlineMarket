import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { item } from '../_models/Item';
import { map, Observable } from 'rxjs';
import { CreateItem } from '../_models/CreateItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:7255';
  CurrentItem = signal<item | null>(null);

  getAll(): Observable<item[]> {
    return this.http.get<item[]>(this.baseUrl + '/Items').pipe(
      map((items) => {
        if (items && Array.isArray(items) && items.length > 0) {
          return items; // Return the array of items
        }
        return []; // Return an empty array if no items are found or response is not valid
      })
    );
  }

  getOne(id: number): Observable<item> {
    return this.http.get<item>(`${this.baseUrl}/Items/${id}`).pipe(
      map((item) => {
        if (item) {
          return item; // Return the single item if found
        }
        throw new Error('Item not found'); // Throw an error if the item is not found
      })
    );
  }

  CreateItem(item: CreateItem): Observable<CreateItem> {
    return this.http.post<CreateItem>(`${this.baseUrl}/item`, item).pipe(
      map((item) => {
        if (item) {
          return item;
        }
        throw Error('Item could not be created');
      })
    );
  }


  updateItem(item: CreateItem): Observable<CreateItem>{
    return this.http.put<CreateItem>(`${this.baseUrl}/Items`, item).pipe(
      map((item) =>{
        if(item) {
          return item;
        }
        throw Error('Item could not be updated');
      })
    );
  }


  deleteItem(id: number): Observable<number>{
    return this.http.delete<number>(`${this.baseUrl}/Items/${id}`).pipe(
      map((item) =>{
        if(item){
          return item;
        }
        throw Error('Item could not be deleted');
      })
    );
  }
}
