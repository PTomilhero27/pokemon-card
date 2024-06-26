import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CardsComponent } from '../../poke-card/pokemon-card/components/cards/cards.component';
import { FavoritesService } from '../service/favorites.service';
import { SetPokemon } from 'src/app/models/sets';
import { Card } from 'src/app/models/cards';
import { CardsComponent as SetCardComponent } from '../../poke-sets/pokemon-set/components/cards/cards.component';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/components/search-bar/service/search.service';

@Component({
  selector: 'app-pokemon-favorites',
  standalone: true,
  imports: [CommonModule, CardsComponent, SetCardComponent],
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.scss'],
})
export class PokemonFavoritesComponent implements OnInit, OnDestroy {
  favoriteCards: Card[] = [];
  favoriteSets: SetPokemon[] = [];
  filteredFavoriteCards: Card[] = [];
  filteredFavoriteSets: SetPokemon[] = [];
  private searchSubscription!: Subscription;
  private readonly searchService = inject(SearchService);

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoriteCards = this.favoritesService.getFavoriteCards();
    this.favoriteSets = this.favoritesService.getFavoriteSets();
    this.filteredFavoriteCards = this.favoriteCards;
    this.filteredFavoriteSets = this.favoriteSets;
    this.subscribeToSearch();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  subscribeToSearch() {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(
      (term) => {
        this.filterFavorites(term);
      }
    );
  }

  filterFavorites(term: string) {
    if (!term) {
      this.filteredFavoriteCards = this.favoriteCards;
      this.filteredFavoriteSets = this.favoriteSets;
    } else {
      const lowerCaseTerm = term.toLowerCase();
      this.filteredFavoriteCards = this.favoriteCards.filter((card) =>
        card.name.toLowerCase().includes(lowerCaseTerm)
      );
      this.filteredFavoriteSets = this.favoriteSets.filter((set) =>
        set.name.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
