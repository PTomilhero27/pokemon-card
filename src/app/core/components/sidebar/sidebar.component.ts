import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MenuModule } from 'primeng/menu';
import { gsap } from 'gsap';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Input() currentTheme: string = '';
  @Input() showSideBarOnMobile: boolean = false;
  public selectedButton: string = '';
  public windowWidth: number = window.innerWidth;
  private backgroundElement: HTMLElement | null = null;

  public items = [
    { label: 'Home', path: 'home', icon: 'house' },
    { label: 'Cards', path: 'home/cards', icon: 'wallet-cards' },
    { label: 'Sets', path: 'home/sets', icon: 'layout-grid' },
    { label: 'Favoritos', path: 'home/favoritos', icon: 'star' },
  ];

  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit() {
    this.updateWindowWidth();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateSelectedButtonBasedOnRoute(event.urlAfterRedirects);
      });

    // Check the initial route on component load
    this.updateSelectedButtonBasedOnRoute(this.router.url);
  }

  ngAfterViewInit() {
    this.backgroundElement = this.el.nativeElement.querySelector('.background');

    setTimeout(() => {
      this.updateSelectedButtonBasedOnRoute(this.router.url);
    }, 500);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowWidth();
  }

  updateWindowWidth() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth > 576) {
      this.showSideBarOnMobile = false;
    }
  }

  selectButton(buttonLabel: string, path: string) {
    this.selectedButton = buttonLabel;
    this.router.navigate([path]).then(() => {
      this.moveBackground(buttonLabel);
    });
  }

  moveBackground(buttonLabel: string) {
    const buttonElement = this.el.nativeElement.querySelector(
      `.${buttonLabel}`
    );
    if (buttonElement && this.backgroundElement) {
      const buttonRect = buttonElement.getBoundingClientRect();
      const sidebarRect = this.el.nativeElement
        .querySelector('.sidebar')
        .getBoundingClientRect();

      gsap.to(this.backgroundElement, {
        top: buttonRect.top - sidebarRect.top,
        height: buttonRect.height,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else {
      console.error('Button element or background element not found');
    }
  }

  toggleSidebar() {
    this.showSideBarOnMobile = !this.showSideBarOnMobile;
  }

  updateSelectedButtonBasedOnRoute(url: string) {
    if (url.includes('home/cards') || url.includes('home/cards/review')) {
      this.selectButton('Cards', url);
    } else if (url.includes('home/sets' || url.includes('home/sets/review'))) {
      this.selectButton('Sets', url);
    } else if (url.includes('home/favoritos')) {
      this.selectButton('Favoritos', 'home/favoritos');
    } else if (url.includes('home')) {
      this.selectButton('Home', 'home');
    }
  }
}
