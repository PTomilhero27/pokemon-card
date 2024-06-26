import { ThemeService } from './../../../../../../../core/service/theme.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { Card } from 'src/app/models/cards';
import { Router } from '@angular/router';
import { CardService } from '../../../service/card.service';
import { DefaultTheme, ThemeProps } from 'src/app/models/theme';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() data!: Card;
  public currentTheme: ThemeProps = DefaultTheme;

  constructor(
    private readonly cardService: CardService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  selectCard(): void {
    this.cardService.setSelectedCard(this.data);
    this.router.navigate(['/home/cards/review']);
  }
}
