import { Component, OnInit, Inject } from '@angular/core';
import { CardService } from '../service/card.service';
import { Card } from 'src/app/models/cards';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BadgeModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  public card: Card | null = null;
  public isFavorite: boolean = false;

  constructor(@Inject(CardService) private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getSelectedCard().subscribe((card: Card | null) => {
      this.card = card;
    });

    console.log(this.card);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
