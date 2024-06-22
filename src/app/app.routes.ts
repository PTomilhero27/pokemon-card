import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/route').then(m => m.loginRoutes) },
  { path: 'home', loadChildren: () => import('./pages/home/route').then(m => m.HomeRoutes) },
  { path: '**', redirectTo: 'login' }
];
