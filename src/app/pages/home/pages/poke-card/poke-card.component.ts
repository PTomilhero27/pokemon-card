import { Component } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-poke-card',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, RouterOutlet],
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent {}
