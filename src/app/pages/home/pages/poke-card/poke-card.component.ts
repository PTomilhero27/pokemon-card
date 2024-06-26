import { Component, OnInit, inject } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { Card } from 'src/app/models/cards';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-poke-card',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, RouterOutlet],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.scss',
})
export class PokeCardComponent implements OnInit {
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
    this.pokemonService.getCards(this.page, this.pageSize).subscribe((data) => {
      this.pokemons = [...this.pokemons, ...data];
      this.page++;
      this.loading = false;
    });
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '800px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
