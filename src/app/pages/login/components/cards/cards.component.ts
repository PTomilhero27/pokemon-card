import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

interface Pokemon {
  id: number;
  stage: number;
  name: string;
  gif: string;
  photo: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  pokemons: Pokemon[] = [
    {
      id: 0,
      stage: 2,
      name: 'Charizard GX',
      gif: '/assets/fire.gif',
      photo: '/assets/charizard.png',
      backgroundColor: 'bg-danger'
    },
    {
      id: 1,
      stage: 2,
      name: 'Blastoise GX',
      gif: '/assets/water.gif',
      photo: '/assets/blastoise.png',
      backgroundColor: 'bg-primary'
    },
    {
      id: 2,
      stage: 2,
      name: 'Venusaur GX',
      gif: '/assets/ground.gif',
      photo: '/assets/venusaur.png',
      backgroundColor: 'bg-ground'
    },
    {
      id: 3,
      stage: 2,
      name: 'Pikachu GX',
      gif: '/assets/ray.gif',
      photo: '/assets/pikachu.png',
      backgroundColor: 'bg-ray'
    }
  ];

  selectedPokemon: Pokemon;

  constructor(private renderer: Renderer2) {
    this.selectedPokemon = this.selectPokemon();
  }

  ngOnInit() {
    this.createSparkles();
    this.animateEntrance();
  }

  selectPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * this.pokemons.length);
    return this.pokemons[randomIndex];
  }

  createSparkles() {
    const container = document.querySelector('.sparkles');
    for (let i = 0; i < 100; i++) {
      const sparkle = this.renderer.createElement('div');
      this.renderer.addClass(sparkle, 'sparkle');
      this.renderer.appendChild(container, sparkle);
      this.animateSparkle(sparkle);
    }
  }

  animateSparkle(sparkle: any) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.set(sparkle, {
      x: Math.random() * window.innerWidth / 2,
      y: Math.random() * window.innerHeight,
      opacity: 0,
    })
    .to(sparkle, {
      opacity: 1,
      duration: Math.random() * 1 + 0.5,
      x: `+=${Math.random() * 50 - 25}`,
      y: `+=${Math.random() * 50 - 25}`,
      ease: 'sine.inOut',
    })
    .to(sparkle, {
      opacity: 0,
      duration: Math.random() * 1 + 0.5,
      ease: 'sine.inOut',
    });
  }

  getScaleForPokemon(): number {
    const pokemon = this.selectedPokemon;
  
    switch (pokemon.id) {
      case 3:
        return 4;
      case 2:
        return 4;
      case 0:
        return 3.2;
      case 1:
        return 3.2;
      default:
        return 0;
    }
  }

  animateEntrance() {
    const timeline = gsap.timeline();
    timeline
      .to('.pokemon-animation', { duration: 2, width: '200%', height: '200%', opacity: 1 })
      .to('.pokemon-photo', { duration: 1.5, opacity: 1, scale: this.getScaleForPokemon() }, '-=1.5')
      .to('.pokemon-animation', { duration: 1.2, opacity: 0 });
  }
}
