import { ItemPhoto } from './ItemPhoto';

export class CreateItem {
  title: string = '';
  description: string = '';
  price: number = 0;
  createdAt: Date = new Date();
  userId: number = 0;
  photos: ItemPhoto[] = [];
}
