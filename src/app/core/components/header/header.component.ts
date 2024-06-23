import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../service/theme.service';
import { DefaultTheme, ThemeProps } from 'src/app/models/theme';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    AvatarModule,
    MenuModule,
    LucideAngularModule,
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[] | undefined;
  public theme: MenuItem[] | undefined;
  public currentTheme: ThemeProps = DefaultTheme;


  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-person',
            command: () => this.router.navigate(['/profile'])
          },
          {
            label: 'Sair',
            icon: 'pi pi-upload',
            command: () => this.router.navigate(['/login'])
              
          }
        ]
      }
    ];

    this.theme = [
      {
        label: 'Tema',
        items: [
          {
            label: 'Escuro',
            icon: '',
            command: () => {
              this.themeService.setTheme('dark');
            }
          },
          {
            label: 'Claro',
            icon: '',
            command: () => {
              this.themeService.setTheme('light');
            }
          }
        ]
      }
    ];

    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

}
