import { SetService } from './../service/set.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { SetPokemon } from 'src/app/models/sets';

@Component({
  selector: 'app-set-review',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  templateUrl: './set-review.component.html',
  styleUrl: './set-review.component.scss',
})
export class SetReviewComponent implements OnInit {
  public card: SetPokemon | null = null;
  public isFavorite: boolean = false;
  constructor(@Inject(SetService) private setService: SetService) {}

  ngOnInit(): void {
    this.setService.getSelectedSet().subscribe((card: SetPokemon | null) => {
      this.card = card;
    });

    console.log(this.card);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
