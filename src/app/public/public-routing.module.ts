import { Routes } from '@angular/router';
import { homeRoutes } from './home/home-routing.module';

export const publicRoutes: Routes = [
  {
    path: 'home',
    children: homeRoutes,
  },
];
