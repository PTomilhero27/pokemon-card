import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CardsComponent } from "./components/cards/cards.component";
import { PokeCardComponent } from "./pages/poke-card/poke-card.component";
import { ReviewComponent } from "./pages/poke-card/review/review.component";
import { PokemonCardComponent } from "./pages/poke-card/pokemon-card/pokemon-card.component";


export const HomeRoutes: Route[] = [
  {
    path: '', loadComponent: () => HomeComponent, children: [
      { path: '', loadComponent: () => CardsComponent},
      { path: 'cards', loadComponent: () => PokeCardComponent , children: [
        { path: '', loadComponent: () => PokemonCardComponent},
        { path: 'review', loadComponent: () => ReviewComponent},
      ]}
    ]
  },
]
