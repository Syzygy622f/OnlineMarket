export class Card {
  id: number = 0;
  nameHolder: string = '';
  cardNumber: string = '';
  expirationDate: Date = new Date();
  Cvv: number = 0;
  userId: string | undefined = undefined;
}
