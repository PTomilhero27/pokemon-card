import { SetService } from './../service/set.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { SetPokemon } from 'src/app/models/sets';
import { FavoritesService } from '../../favorites/service/favorites.service';
import { MessageService } from 'primeng/api';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-set-review',
  standalone: true,
  imports: [CommonModule, BadgeModule, LucideAngularModule],
  templateUrl: './set-review.component.html',
  styleUrl: './set-review.component.scss',
})
export class SetReviewComponent implements OnInit {
  public setCard: SetPokemon | null = null;
  public isFavorite: boolean = false;
  constructor(
    @Inject(SetService) private setService: SetService,
    private favoritesService: FavoritesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setService.getSelectedSet().subscribe((card: SetPokemon | null) => {
      this.setCard = card;
    });

    if (this.setCard) {
      this.isFavorite = this.favoritesService
        .getFavoriteSets()
        .some((fav) => fav.id === this.setCard!.id);
    }
  }

  toggleFavorite(): void {
    if (!this.setCard) return;
    const detail: string = `Set ${
      !this.isFavorite ? 'adicionado' : 'removido'
    } com sucesso`;
    if (this.isFavorite) {
      this.favoritesService.removeFavoriteSet(this.setCard.id);
    } else this.favoritesService.addFavoriteSet(this.setCard);
    this.messageService.add({
      severity: this.isFavorite ? 'error' : 'success',
      detail,
    });
    this.isFavorite = !this.isFavorite;
  }
}
