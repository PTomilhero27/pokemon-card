import { Injectable } from '@angular/core';
import { Card } from 'src/app/models/cards';
import { SetPokemon } from 'src/app/models/sets';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favorites';

  constructor() {}

  private getFavorites(): { cards: Card[]; sets: SetPokemon[] } {
    const storedFavorites = localStorage.getItem(this.storageKey);
    return storedFavorites
      ? JSON.parse(storedFavorites)
      : { cards: [], sets: [] };
  }

  private saveFavorites(favorites: { cards: Card[]; sets: SetPokemon[] }) {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  addFavoriteCard(card: Card) {
    const favorites = this.getFavorites();
    favorites.cards.push(card);
    this.saveFavorites(favorites);
  }

  removeFavoriteCard(cardId: string) {
    const favorites = this.getFavorites();
    favorites.cards = favorites.cards.filter((card) => card.id !== cardId);
    this.saveFavorites(favorites);
  }

  getFavoriteCards() {
    return this.getFavorites().cards;
  }

  addFavoriteSet(set: SetPokemon) {
    const favorites = this.getFavorites();
    favorites.sets.push(set);
    this.saveFavorites(favorites);
  }

  removeFavoriteSet(setId: string) {
    const favorites = this.getFavorites();
    favorites.sets = favorites.sets.filter((set) => set.id !== setId);
    this.saveFavorites(favorites);
  }

  getFavoriteSets() {
    return this.getFavorites().sets;
  }
}
