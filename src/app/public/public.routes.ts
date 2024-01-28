import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home/home.component').then(module => module.HomeComponent),
  },
] as Routes;
