import { Routes } from '@angular/router';
import { plotsRoutes } from './plots/plots-routing.module';
import { territoriesRoutes } from './territories/territories-routing.module';
import { blocksRoutes } from './blocks/blocks-routing.module';

export const protectedRoutes: Routes = [
  {
    path: 'plots',
    children: plotsRoutes,
  },
  {
    path: 'territories',
    children: territoriesRoutes,
  },
  {
    path: 'blocks',
    children: blocksRoutes,
  },
];
