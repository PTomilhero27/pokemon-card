import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultTheme, ThemeProps } from 'src/app/models/theme';

@Injectable({
  providedIn: 'root'
})


export class ThemeService {
  
  private themeSubject: BehaviorSubject<ThemeProps> = new BehaviorSubject<ThemeProps>(DefaultTheme);
  theme$ = this.themeSubject.asObservable();

  constructor() { 
    this.applyTheme(this.themeSubject.value);
  }

  setTheme(theme: ThemeProps) {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  getTheme(): ThemeProps {
    return this.themeSubject.value;
  }

  applyTheme(theme: ThemeProps) {
    document.body.classList.remove('light-theme', 'dark-theme', 'system-theme');
    document.body.classList.add(`${theme}-theme`);
  }
}
