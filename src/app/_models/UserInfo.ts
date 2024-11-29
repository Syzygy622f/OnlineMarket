import { LivingPlace } from "./LivingPlace";
import { UserPhoto } from "./Userphoto";

export class UserInfo{
    name: string = '';
    lastName: string = '';
    dateOfBirth: Date = new Date();
    mail: string = '';
    photo: UserPhoto = new UserPhoto();
    livingplace: LivingPlace = {id: 0, city: '', postCode: 0, address: ''};
}