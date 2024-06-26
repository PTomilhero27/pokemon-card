import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-poke-sets',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './poke-sets.component.html',
  styleUrl: './poke-sets.component.scss',
})
export class PokeSetsComponent {}
