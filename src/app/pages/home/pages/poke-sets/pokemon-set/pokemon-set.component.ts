import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { SetPokemon } from 'src/app/models/sets';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-pokemon-set',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './pokemon-set.component.html',
  styleUrl: './pokemon-set.component.scss',
})
export class PokemonSetComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  public pokemons: SetPokemon[] = [];
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
    this.pokemonService.getSets(this.page, this.pageSize).subscribe((data) => {
      console.log(data);
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
