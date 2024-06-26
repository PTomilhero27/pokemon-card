import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Card } from 'src/app/models/cards';
import { CardsComponent } from './components/cards/cards.component';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/components/search-bar/service/search.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  private readonly pokemonService = inject(PokemonService);
  private readonly searchService = inject(SearchService);
  public pokemons: Card[] = [];
  public filteredPokemons: Card[] = [];
  private page: number = 1;
  private pageSize: number = 35;
  private loading: boolean = false;
  private searchSubscription!: Subscription;

  ngOnInit() {
    this.loadMorePokemons();
    this.setupIntersectionObserver();
    this.subscribeToSearch();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadMorePokemons() {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getCards(this.page, this.pageSize).subscribe((data) => {
      this.pokemons = [...this.pokemons, ...data];
      this.filteredPokemons = this.pokemons;
      this.page++;
      this.loading = false;
      this.filterPokemons(this.searchService.getSearchTerm());
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

  subscribeToSearch() {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(
      (term) => {
        this.filterPokemons(term);
      }
    );
  }

  filterPokemons(term: string) {
    if (!term) {
      this.filteredPokemons = this.pokemons;
    } else {
      const lowerCaseTerm = term.toLowerCase();
      this.filteredPokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
