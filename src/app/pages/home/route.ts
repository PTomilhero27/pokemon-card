import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CardsComponent } from "./components/cards/cards.component";


export const HomeRoutes: Route[] = [
  {
    path: '', loadComponent: () => HomeComponent, children: [
      { path: '', loadComponent: () => CardsComponent}
    ]
  },
]