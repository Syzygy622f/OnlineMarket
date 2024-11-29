import { ItemPhoto } from "./ItemPhoto";

export class CreateItem{
    id: number = 0;
    title: string = '';
    description: string = '';
    price: number = 0;
    createdAt: Date = new Date;
    userId: number = 0;
    photos: ItemPhoto[] = [];
}