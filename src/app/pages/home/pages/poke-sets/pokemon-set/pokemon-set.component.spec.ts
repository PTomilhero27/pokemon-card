import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSetComponent } from './pokemon-set.component';

describe('PokemonSetComponent', () => {
  let component: PokemonSetComponent;
  let fixture: ComponentFixture<PokemonSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
