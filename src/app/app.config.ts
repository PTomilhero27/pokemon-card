import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { LUCIDE_ICONS, LayoutGrid, LucideAngularModule, LucideIconProvider, Menu, Moon, Star, Sun, WalletCards } from 'lucide-angular';
import { MyIcon } from './utils/my-icon';
import { ThemeService } from './core/service/theme.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './core/service/auth-interceptor.service';
import { CustomXhrFactory } from 'src/custom-xhr.factory';
import { XhrFactory } from '@angular/common';

const myIcons = {
  [MyIcon.name]: MyIcon.data
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding()
    ),
    importProvidersFrom(
      HttpClientModule,
      LucideAngularModule.pick({Sun, Moon, WalletCards, Star, LayoutGrid, Menu})
    ),
    MessageService,
    ThemeService,
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(myIcons)
    },
    { provide: XhrFactory, useClass: CustomXhrFactory },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
};
