import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchService.setSearchTerm(inputElement.value);
  }
}
