import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserInfo } from '../_models/UserInfo';
import { Card } from '../_models/Card';
import { item } from '../_models/Item';
import { SaveList } from '../_models/SaveList';

@Injectable({
  providedIn: 'root'
})
export class UserService {
http = inject(HttpClient);
baseUrl = "https://localhost:7255";

  getOne(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/User/id?id=${id}`).pipe(
      map(user => {
        if (user) {
          return user; // Return the single item if found
        }
        throw new Error('Item not found'); // Throw an error if the item is not found
      })
    );
  }

  getIdFromMail(mail: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/User/mail?Mail=${mail}`).pipe(
      map(id => {
        if (id) {
          return id; // Return the single item if found
        }
        throw new Error('mail not found'); // Throw an error if the item is not found
      })
    );
  }


  updateUser(user: UserInfo){ //mangler header
    return this.http.put<UserInfo>(`${this.baseUrl}/User/Update`, user).pipe(
      map(user => {
        if(user){
          return user;
        }
        throw new Error('something went wrong');
      })
    );
  }




  createCard(card: Card){
    return this.http.post<Card>(`${this.baseUrl}/Card`, card).pipe(
      map(card => {
        if(card){
          return card;
        }
        throw new Error('something went wrong');
      })
    );
  }




  addToSaveList(item: SaveList){
    return this.http.post<SaveList>(`${this.baseUrl}/User/addToList`, item).pipe(
      map(card => {
        if(card){
          return card;
        }
        throw new Error('something went wrong');
      })
    );
  }

  removeFromSaveList(id: number){
    return this.http.delete(`${this.baseUrl}/User/removerFromSaveList/id?id=${id}`).pipe(
      
    )
  }

}
