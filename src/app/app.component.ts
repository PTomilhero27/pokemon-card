import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-card';
}
