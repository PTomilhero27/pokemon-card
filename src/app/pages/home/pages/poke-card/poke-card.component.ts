import { Component, OnInit, inject } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { Card } from 'src/app/models/cards';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-poke-card',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, RouterOutlet],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.scss'
})
export class PokeCardComponent {

}
