import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { CardModule } from 'primeng/card';
import { Card } from 'src/app/models/cards';
import { SetPokemon } from 'src/app/models/sets';
import { Router } from '@angular/router';
import { FavoritesService } from '../../pages/favorites/service/favorites.service';
import { ThemeService } from 'src/app/core/service/theme.service';
import { DefaultTheme, ThemeProps } from 'src/app/models/theme';

interface CardItem {
  name: string;
  description: string;
  image: string;
}

interface CardsType {
  title: string;
  path: string;
  items: CardItem[];
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  public cards: CardsType[] = [
    {
      title: 'Cards',
      path: 'cards',
      items: [],
    },
    {
      title: 'Sets',
      path: 'sets',
      items: [],
    },
    {
      title: 'Favoritos',
      path: 'favorites',
      items: [],
    },
  ];
  public currentTheme: ThemeProps = DefaultTheme;

  private readonly pokemonService = inject(PokemonService);
  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);
  private readonly themeService = inject(ThemeService);

  public goToPokeCard = (path: string) =>
    this.router.navigate([`home/${path}`]);

  ngOnInit(): void {
    this.loadSetsAndCards();
  }

  loadSetsAndCards() {
    this.pokemonService.getSetsAndCards().subscribe((response) => {
      this.cards[0].items = response[0].cards.map((card: Card) => ({
        name: card.name,
        description: card.flavorText || 'Sem descrição',
        image: card.images.small,
      }));

      this.cards[1].items = response[0].sets.map((set: SetPokemon) => ({
        name: set.name,
        description: `Serie: ${set.series}`,
        image: set.images.symbol,
      }));

      const favoriteCards = this.favoritesService
        .getFavoriteCards()
        .slice(0, 2)
        .map((card: Card) => ({
          name: card.name,
          description: card.flavorText || 'Sem descrição',
          image: card.images.small,
        }));

      const favoriteSets = this.favoritesService
        .getFavoriteSets()
        .slice(0, 1)
        .map((set: SetPokemon) => ({
          name: set.name,
          description: `Serie: ${set.series}`,
          image: set.images.symbol,
        }));

      this.cards[2].items = [...favoriteCards, ...favoriteSets];
    });

    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
}
