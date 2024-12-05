import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateItem } from '../_models/Item/CreateItem';
import { item } from '../_models/Item/Item';
import { ShortItemInfo } from '../_models/Item/ShortItemInfo';

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
          return items;
        }
        return []; //returnere tom array, hvis der map ikke for en item array
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

  GetAllFromUserId(id: number): Observable<ShortItemInfo[]> {
    return this.http
      .get<ShortItemInfo[]>(`${this.baseUrl}/Items/itemUserId/${id}`)
      .pipe(
        map((item) => {
          if (item) {
            return item;
          }
          throw new Error('something when wrong');
        })
      );
  }

  CreateItem(item: CreateItem): Observable<CreateItem> {
    return this.http.post<CreateItem>(`${this.baseUrl}/item`, item).pipe(
      map((item) => {
        if (item) {
          return item;
        }
        throw new Error('Item could not be created');
      })
    );
  }

  updateItem(item: ShortItemInfo) {
    return this.http.put<ShortItemInfo>(`${this.baseUrl}/Items`, item).pipe(
      map((item) => {
        if (item) {
          return item;
        }
        throw new Error('Item could not be updated');
      })
    );
  }

  deleteItem(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/Items/${id}`).pipe(
      map((item) => {
        if (item) {
          return item;
        }
        throw new Error('Item could not be deleted');
      })
    );
  }
}
