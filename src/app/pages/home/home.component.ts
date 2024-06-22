import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { SidebarComponent } from 'src/app/core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
