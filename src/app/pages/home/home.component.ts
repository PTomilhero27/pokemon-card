import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { SearchBarComponent } from 'src/app/core/components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, SearchBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showSearchBar = false;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRouteForSearchBar(this.router.url);
      }
    });

    this.checkRouteForSearchBar(this.router.url);
  }

  checkRouteForSearchBar(url: string) {
    const segments = url.split('/').filter((segment) => segment);
    if (
      segments.length === 2 &&
      segments[0] === 'home' &&
      segments[1] !== 'profile'
    ) {
      this.showSearchBar = true;
    } else {
      this.showSearchBar = false;
    }
    this.cdr.detectChanges();
  }
}
