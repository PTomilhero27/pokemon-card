import { ThemeService } from './../../../../../core/service/theme.service';
import { SetService } from './../service/set.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { SetPokemon } from 'src/app/models/sets';
import { FavoritesService } from '../../favorites/service/favorites.service';
import { MessageService } from 'primeng/api';
import { LucideAngularModule } from 'lucide-angular';
import { DefaultTheme, ThemeProps } from 'src/app/models/theme';

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
  public currentTheme: ThemeProps = DefaultTheme;

  constructor(
    @Inject(SetService) private setService: SetService,
    private favoritesService: FavoritesService,
    private messageService: MessageService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.setService.getSelectedSet().subscribe((card: SetPokemon | null) => {
      this.setCard = card;
    });

    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });

    if (this.setCard) {
      this.isFavorite = this.favoritesService
        .getFavoriteSets()
        .some((fav) => fav.id === this.setCard!.id);
    }
  }

  toggleFavorite(): void {
    if (!this.setCard) return;
    const detail: string = `Deck ${
      !this.isFavorite ? 'adicionado' : 'removido'
    } com sucesso`;
    if (this.isFavorite) {
      this.favoritesService.removeFavoriteSet(this.setCard.id);
    } else this.favoritesService.addFavoriteSet(this.setCard);
    this.messageService.add({
      severity: 'success',
      detail,
    });
    this.isFavorite = !this.isFavorite;
  }
}
