import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../poke-card/pokemon-card/components/cards/cards.component';
import { FavoritesService } from '../service/favorites.service';
import { SetPokemon } from 'src/app/models/sets';
import { Card } from 'src/app/models/cards';
import { CardsComponent as SetCardComponent } from '../../poke-sets/pokemon-set/components/cards/cards.component';

@Component({
  selector: 'app-pokemon-favorites',
  standalone: true,
  imports: [CommonModule, CardsComponent, SetCardComponent],
  templateUrl: './pokemon-favorites.component.html',
  styleUrl: './pokemon-favorites.component.scss',
})
export class PokemonFavoritesComponent implements OnInit {
  favoriteCards: Card[] = [];
  favoriteSets: SetPokemon[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoriteCards = this.favoritesService.getFavoriteCards();
    this.favoriteSets = this.favoritesService.getFavoriteSets();
  }
}
