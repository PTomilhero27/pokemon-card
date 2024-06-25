import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from 'src/app/models/cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private selectedCardSubject = new BehaviorSubject<Card | null>(null);

  setSelectedCard(card: Card): void {
    console.log('Card selected:', card);
    this.selectedCardSubject.next(card);
  }

  getSelectedCard(): Observable<Card | null> {
    return this.selectedCardSubject.asObservable();
  }
}
