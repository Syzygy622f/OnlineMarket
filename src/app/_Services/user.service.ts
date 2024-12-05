import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserInfo } from '../_models/User/UserInfo';
import { Card } from '../_models/User/Card';
import { SaveList } from '../_models/User/SaveList';
import { UserPhoto } from '../_models/User/Userphoto';
import { LivingPlace } from '../_models/User/LivingPlace';
import { ShortItemInfo } from '../_models/Item/ShortItemInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  baseUrl = 'https://localhost:7255';

  getOne(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/User/id?id=${id}`).pipe(
      map((user) => {
        if (user) {
          const userinfo = Object.assign(new UserInfo(), user);
          userinfo.photo = Object.assign(new UserPhoto(), user.photo);
          userinfo.livingPlace = Object.assign(
            new LivingPlace(),
            user.livingPlace
          );
          return userinfo;
        }
        throw new Error('Item not found');
      })
    );
  }

  updateUser(user: UserInfo) {
    return this.http.put<UserInfo>(`${this.baseUrl}/User`, user).pipe(
      map((user) => {
        if (user) {
          return user;
        }
        throw new Error('something went wrong');
      })
    );
  }

  createCard(card: Card) {
    return this.http.post<Card>(`${this.baseUrl}/Card`, card).pipe(
      map((card) => {
        if (card) {
          return card;
        }
        throw new Error('something went wrong');
      })
    );
  }

  GetCard(id: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}/User/Card?id=${id}`).pipe(
      map((card) => {
        if (card) {
          return card;
        }
        throw new Error('couldnt get credit cards');
      })
    );
  }

  DeleteCard(id: number) {
    return this.http.delete<number>(`${this.baseUrl}/User/card/${id}`).pipe(
      map((card) => {
        if (card) {
          return card;
        }
        throw new Error('couldt delete credit card');
      })
    );
  }

  addToSaveList(item: SaveList) {
    return this.http.post<SaveList>(`${this.baseUrl}/SaveList`, item).pipe(
      map((list) => {
        if (list) {
          return list;
        }
        throw new Error('something went wrong');
      })
    );
  }

  GetSaveList(id: number): Observable<ShortItemInfo[]> {
    return this.http
      .get<ShortItemInfo[]>(`${this.baseUrl}/Savelist?id=${id}`)
      .pipe(
        map((list) => {
          if (list) {
            return list;
          }
          throw new Error('something went wrong');
        })
      );
  }

  removeFromSaveList(id: number) {
    return this.http
      .delete(`${this.baseUrl}/User/removerFromSaveList/id?id=${id}`)
      .pipe();
  }
}
