import { LivingPlace } from "./LivingPlace";
import { UserPhoto } from "./Userphoto";


export class UserInfo{
    id: number = 0;
    name: string | null = null;
    lastName: string | null = null;
    dateOfBirth: Date = new Date;
    mail: string | null = null;
    photo: UserPhoto = new UserPhoto();
    livingPlace: LivingPlace = new LivingPlace();
}