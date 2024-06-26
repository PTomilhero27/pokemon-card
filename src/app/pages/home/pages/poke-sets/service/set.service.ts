import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SetPokemon } from 'src/app/models/sets';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  private selectedCardSubject = new BehaviorSubject<SetPokemon | null>(null);

  setSelectedSet(card: SetPokemon): void {
    this.selectedCardSubject.next(card);
  }

  getSelectedSet(): Observable<SetPokemon | null> {
    return this.selectedCardSubject.asObservable();
  }
}
