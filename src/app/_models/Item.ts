import { ItemPhoto } from "./ItemPhoto";

export interface item{
    id: number;
    title: string;
    description: string;
    price: number;
    createdAt: Date;
    userId: number;
    city: string;
    name: string;
    lastName: string;
    itemPhotos: ItemPhoto[];
}