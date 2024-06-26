import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { SetPokemon } from 'src/app/models/sets';
import { CardsComponent } from './components/cards/cards.component';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/components/search-bar/service/search.service';

@Component({
  selector: 'app-pokemon-set',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './pokemon-set.component.html',
  styleUrls: ['./pokemon-set.component.scss'],
})
export class PokemonSetComponent implements OnInit, OnDestroy {
  private readonly pokemonService = inject(PokemonService);
  private readonly searchService = inject(SearchService);
  public sets: SetPokemon[] = [];
  public filteredSets: SetPokemon[] = [];
  private page: number = 1;
  private pageSize: number = 35;
  private loading: boolean = false;
  private searchSubscription!: Subscription;

  ngOnInit() {
    this.loadMoreSets();
    this.setupIntersectionObserver();
    this.subscribeToSearch();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadMoreSets() {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getSets(this.page, this.pageSize).subscribe((data) => {
      this.sets = [...this.sets, ...data];
      this.filteredSets = this.sets;
      this.page++;
      this.loading = false;
      this.filterSets(this.searchService.getSearchTerm());
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
          this.loadMoreSets();
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
        this.filterSets(term);
      }
    );
  }

  filterSets(term: string) {
    if (!term) {
      this.filteredSets = this.sets;
    } else {
      const lowerCaseTerm = term.toLowerCase();
      this.filteredSets = this.sets.filter((set) =>
        set.name.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
