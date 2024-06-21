import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    provideRouter(routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    provideAnimations(),
    importProvidersFrom(
      ButtonModule,
      ToastModule,
      RippleModule
    ),
    MessageService
  ],
};
