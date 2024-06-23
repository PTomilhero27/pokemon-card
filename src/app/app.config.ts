import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { LUCIDE_ICONS, LayoutGrid, LucideAngularModule, LucideIconProvider, Moon, Star, Sun, WalletCards } from 'lucide-angular';
import { MyIcon } from './utils/my-icon';
import { ThemeService } from './core/service/theme.service';

const myIcons = {
  [MyIcon.name]: MyIcon.data
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // provideHttpClient(),
    provideRouter(routes,
      withPreloading(PreloadAllModules),
    ),
    importProvidersFrom(
      LucideAngularModule.pick({Sun, Moon, WalletCards, Star, LayoutGrid})
    ),
    MessageService,
    ThemeService,
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(myIcons)
    },

  ],
};
