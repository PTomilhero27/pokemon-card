import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetReviewComponent } from './set-review.component';

describe('SetReviewComponent', () => {
  let component: SetReviewComponent;
  let fixture: ComponentFixture<SetReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
