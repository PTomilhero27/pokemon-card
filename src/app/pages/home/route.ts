import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { CardsComponent } from './components/cards/cards.component';
import { PokeCardComponent } from './pages/poke-card/poke-card.component';
import { ReviewComponent } from './pages/poke-card/review/review.component';
import { PokemonCardComponent } from './pages/poke-card/pokemon-card/pokemon-card.component';
import { PokeSetsComponent } from './pages/poke-sets/poke-sets.component';
import { PokemonSetComponent } from './pages/poke-sets/pokemon-set/pokemon-set.component';
import { SetReviewComponent } from './pages/poke-sets/set-review/set-review.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PokemonFavoritesComponent } from './pages/favorites/pokemon-favorites/pokemon-favorites.component';
import { ProfileComponent } from './pages/account/profile/profile.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => HomeComponent,
    children: [
      { path: '', loadComponent: () => CardsComponent },
      {
        path: 'cards',
        loadComponent: () => PokeCardComponent,
        children: [
          { path: '', loadComponent: () => PokemonCardComponent },
          { path: 'review', loadComponent: () => ReviewComponent },
        ],
      },
      {
        path: 'sets',
        loadComponent: () => PokeSetsComponent,
        children: [
          { path: '', loadComponent: () => PokemonSetComponent },
          { path: 'review', loadComponent: () => SetReviewComponent },
        ],
      },
      {
        path: 'favorites',
        loadComponent: () => FavoritesComponent,
        children: [
          { path: '', loadComponent: () => PokemonFavoritesComponent },
        ],
      },
      {
        path: 'profile',
        loadComponent: () => ProfileComponent,
      },
    ],
  },
];
