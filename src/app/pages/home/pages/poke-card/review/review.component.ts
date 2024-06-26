import { Component, OnInit, Inject } from '@angular/core';
import { CardService } from '../service/card.service';
import { Card } from 'src/app/models/cards';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { BadgeModule } from 'primeng/badge';
import { FavoritesService } from '../../favorites/service/favorites.service';
import { MessageService } from 'primeng/api';

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

  constructor(
    @Inject(CardService) private cardService: CardService,
    private favoritesService: FavoritesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cardService.getSelectedCard().subscribe((card: Card | null) => {
      this.card = card;
      if (this.card) {
        this.isFavorite = this.favoritesService
          .getFavoriteCards()
          .some((fav) => fav.id === this.card!.id);
      }
    });
  }

  toggleFavorite(): void {
    if (!this.card) return;
    const detail: string = `Card ${
      !this.isFavorite ? 'adicionado' : 'removido'
    } com sucesso`;
    if (this.isFavorite) {
      this.favoritesService.removeFavoriteCard(this.card.id);
    } else this.favoritesService.addFavoriteCard(this.card);
    this.messageService.add({
      severity: this.isFavorite ? 'error' : 'success',
      detail,
    });
    this.isFavorite = !this.isFavorite;
  }
}
