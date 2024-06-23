import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Cards', icon: 'credit-card', routerLink: ['/cards'] },
      { label: 'Sets', icon: 'grid', routerLink: ['/sets'] },
      { label: 'Favorites', icon: 'star', routerLink: ['/favorites'] }
    ];
  }
}
