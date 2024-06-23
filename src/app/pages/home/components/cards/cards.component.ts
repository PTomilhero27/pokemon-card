import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
 cards = [
    {
      title: 'Cards',
      items: [
        { name: 'Card 1', description: 'Descrição do card', image: '/placeholder.svg' },
        { name: 'Card 2', description: 'Descrição do card', image: '/placeholder.svg' },
        { name: 'Card 3', description: 'Descrição do card', image: '/placeholder.svg' }
      ]
    },
    {
      title: 'Sets',
      items: [
        { name: 'Set 1', description: 'Descrição do set', image: '/placeholder.svg' },
        { name: 'Set 2', description: 'Descrição do set', image: '/placeholder.svg' },
        { name: 'Set 3', description: 'Descrição do set', image: '/placeholder.svg' }
      ]
    },
    {
      title: 'Favoritos',
      items: [
        { name: 'Favorito 1', description: 'Descrição do favorito', image: '/placeholder.svg' },
        { name: 'Favorito 2', description: 'Descrição do favorito', image: '/placeholder.svg' },
        { name: 'Favorito 3', description: 'Descrição do favorito', image: '/placeholder.svg' }
      ]
    }
  ];
}
