import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject, inject } from '@angular/core';
import { Card } from 'src/app/models/cards';
import { CardsComponent } from './components/cards/cards.component';
import { PokemonService } from 'src/app/core/service/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent implements OnInit  {
  private readonly pokemonService = inject(PokemonService);
  public pokemons: Card[] = [];
  private page: number = 1;
  private pageSize: number = 35;
  private loading: boolean = false;

  ngOnInit() {
    this.loadMorePokemons();
    this.setupIntersectionObserver();
  }

  loadMorePokemons() {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getCards(this.page, this.pageSize).subscribe(data => {
      this.pokemons = [...this.pokemons, ...data];
      this.page++;
      this.loading = false;
    });
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '800px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadMorePokemons();
        }
      });
    }, options);

    const sentinel = document.querySelector('#scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }
  }
}
