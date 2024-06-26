import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import {
  Heart,
  House,
  LUCIDE_ICONS,
  LayoutGrid,
  LucideAngularModule,
  LucideIconProvider,
  Menu,
  Moon,
  Star,
  Sun,
  WalletCards,
} from 'lucide-angular';
import { MyIcon } from './utils/my-icon';
import { ThemeService } from './core/service/theme.service';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { AuthInterceptor } from './core/service/auth-interceptor.service';
import { CustomXhrFactory } from 'src/custom-xhr.factory';
import { XhrFactory } from '@angular/common';
import { CardService } from './pages/home/pages/poke-card/service/card.service';
import { SetService } from './pages/home/pages/poke-sets/service/set.service';
import { FavoritesService } from './pages/home/pages/favorites/service/favorites.service';

const myIcons = {
  [MyIcon.name]: MyIcon.data,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding()
    ),
    importProvidersFrom(
      HttpClientModule,
      LucideAngularModule.pick({
        Sun,
        Moon,
        WalletCards,
        Star,
        LayoutGrid,
        Menu,
        House,
        Heart,
      })
    ),
    MessageService,
    CardService,
    ThemeService,
    SetService,
    FavoritesService,
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(myIcons),
    },
    { provide: XhrFactory, useClass: CustomXhrFactory },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
