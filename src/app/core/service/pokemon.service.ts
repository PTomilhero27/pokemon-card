import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Card, CardData } from 'src/app/models/cards';
import { SetsData } from 'src/app/models/sets';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://api.pokemontcg.io/v2';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getCards(page: number = 1, pageSize: number = 10): Observable<Card[]> {
      return this.http.get<CardData>(`${this.apiUrl}/cards`, {
        params: { page: page.toString(), pageSize: pageSize.toString() },
      }).pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching cards:', error);
          return of([]);
        })
      );
  }

  getSets(page: number = 1, pageSize: number = 10): Observable<SetsData[]> {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Request made on the browser');
      return this.http.get<SetsData[]>(`${this.apiUrl}/sets`, {
        params: { page: page.toString(), pageSize: pageSize.toString() },
      });
    } else {
      console.log('Request attempted on the server');
      return of([] as SetsData[]);
    }
  }

 getSetsAndCards(page: number = 1, pageSize: number = 3): Observable<{sets: any[], cards: []}[]> {
    return forkJoin({
      sets: this.getSets(page, pageSize),
      cards: this.getCards(page, pageSize)
    }).pipe(
      map((response: any) => {
        const sets = response.sets;
        const cards = response.cards;
        return [{sets: sets, cards: cards}];
      }),
      catchError(error => {
        console.error('Error:', error);
        return of([]);
      })
    );
  }
}
