import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { Card } from 'src/app/models/cards';
import { Router } from '@angular/router';
import { CardService } from '../../../../poke-card/service/card.service';
import { SetPokemon } from 'src/app/models/sets';
import { SetService } from '../../../service/set.service';

@Component({
  selector: 'app-set-cards',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() data!: SetPokemon;

  constructor(
    private readonly setService: SetService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  selectCard(): void {
    this.setService.setSelectedSet(this.data);
    this.router.navigate(['/home/sets/review']);
  }
}
