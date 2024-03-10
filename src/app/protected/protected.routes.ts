import { Routes } from '@angular/router';
import { PopUpService } from './core/popup.service';
import { PlotService } from './core/plot.service';

export default [
  {
    path: '',
    providers: [PopUpService, PlotService],
    children: [
      {
        path: 'plots',
        loadComponent: () =>
          import('./plots/plot/plot.component').then(
            module => module.PlotComponent
          ),
      },
      {
        path: 'territories',
        loadComponent: () =>
          import('./territories/territory/territory.component').then(
            module => module.TerritoryComponent
          ),
      },
      {
        path: 'blocks',
        loadComponent: () =>
          import('./blocks/block/block.component').then(
            module => module.BlockComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'plots',
      },
    ],
  },
] as Routes;
