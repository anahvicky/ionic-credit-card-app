import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cardsData = new BehaviorSubject([
    {
      id: '1',
      type: 'visacard',
      number: '1234 5678 9012 4875',
      name: 'joel jeffery'
    },
    {
      id: '2',
      type: 'mastercard',
      number: '3234 7683 9857 8744',
      name: 'joel jeffery'
    },
    {
      id: '3',
      type: 'vervecard',
      number: '9874 6783 9023 8985',
      name: 'joel jeffery'
    }
  ]);
  // cardsData = new BehaviorSubject([]);
  constructor() { }

  get cards() {
    return this.cardsData;
  }

  removeCard(cardID: string) {
    const cards = this.cardsData.getValue();
    const filteredCard = cards.filter(f => f.id !== cardID);
    this.cardsData.next(filteredCard);
  }

  addCard(data) {
    const cards = this.cardsData.getValue();
    this.cardsData.next([...cards, data]);
  }
}
