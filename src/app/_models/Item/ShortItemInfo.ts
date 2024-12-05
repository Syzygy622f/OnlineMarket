import { ItemPhoto } from "./ItemPhoto";

export class ShortItemInfo{
    id: number = 0;
    title: string = '';
    price: number | undefined = undefined;
    description: string = '';
    photos: ItemPhoto[] = [];
}