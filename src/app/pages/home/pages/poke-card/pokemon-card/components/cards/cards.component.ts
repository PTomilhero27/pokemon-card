import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { Card } from 'src/app/models/cards';
import { CardService } from '../../../service/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() data!: Card;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  selectCard(): void {
    console.log('review');
    this.cardService.setSelectedCard(this.data);
    this.router.navigate(['/home/cards/review']);
  }
}
