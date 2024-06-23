import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MenuModule } from 'primeng/menu';
import { gsap } from 'gsap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    MenuModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
  
export class SidebarComponent implements OnInit, AfterViewInit {
  @Input() currentTheme: string = '';
  public selectedButton: string = '';
  private backgroundElement: HTMLElement | null = null;

  public items = [
    { label: 'Cards', icon: 'wallet-cards' },
    { label: 'Sets', icon: 'layout-grid' },
    { label: 'Favoritos', icon: 'star' }
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.backgroundElement = this.el.nativeElement.querySelector('.background');
    this.moveBackground(this.selectedButton);
  }

  selectButton(buttonLabel: string) {
    this.selectedButton = buttonLabel;
    this.moveBackground(buttonLabel);
  }

  moveBackground(buttonLabel: string) {
    const buttonElement = this.el.nativeElement.querySelector(`.${buttonLabel}`);
    if (buttonElement && this.backgroundElement) {
      const buttonRect = buttonElement.getBoundingClientRect();
      const sidebarRect = this.el.nativeElement.querySelector('.sidebar').getBoundingClientRect();
      
      gsap.to(this.backgroundElement, {
        top: buttonRect.top - sidebarRect.top,
        height: buttonRect.height,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }
}
