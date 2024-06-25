import { Component, Inject, OnInit } from '@angular/core';
import { CardService } from '../service/card.service';
import { Card } from 'src/app/models/cards';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit{
  card: Card | null = null;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getSelectedCard().subscribe((card: Card | null) => {
      this.card = card;
    });

    console.log(this.card)
  }
}
