import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSetsComponent } from './poke-sets.component';

describe('PokeSetsComponent', () => {
  let component: PokeSetsComponent;
  let fixture: ComponentFixture<PokeSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeSetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
