import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { CardModule } from 'primeng/card';
import { Card } from 'src/app/models/cards';
import { SetPokemon } from 'src/app/models/sets';

interface CardItem {
  name: string;
  description: string;
  image: string;
}

interface CardsType {
  title: string;
  items: CardItem[];
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule, CommonModule,],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
  
export class CardsComponent implements OnInit {
  public cards: CardsType[] = [
    {
      title: 'Cards',
      items: []
    },
    {
      title: 'Sets',
      items: []
    },
    {
      title: 'Favoritos',
      items: []
    }
  ];
  private readonly episodesService = inject(PokemonService);
  
  ngOnInit(): void {
    this.loadSetsAndCards();
  }

  loadSetsAndCards() {
    this.episodesService.getSetsAndCards().subscribe(response => {
      this.cards[0].items = response[0].cards.map((card: Card) => ({
        name: card.name,
        description: card.flavorText || 'Sem descrição',
        image: card.images.small
      }));

      this.cards[1].items = response[0].sets.map((set: SetPokemon) => ({
        name: set.name,
        description: `Serie: ${set.series}`,
        image: set.images.symbol
      }));
    });


  }

}
