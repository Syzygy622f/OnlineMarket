import { ItemPhoto } from "./ItemPhoto";

export interface item{
    id: number;
    title: string;
    description: string;
    price: number;
    createdAt: Date;
    userId: number;
    photos: ItemPhoto[];
}