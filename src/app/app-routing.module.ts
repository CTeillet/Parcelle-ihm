import { RouterModule, Routes } from '@angular/router';
import { GestionParcelleComponent } from './gestion-parcelle/gestion-parcelle.component';
import { GestionPateComponent } from './gestion-pate/gestion-pate.component';
import { GestionTerritoireComponent } from './gestion-territoire/gestion-territoire.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'gestion-parcelle',
    component: GestionParcelleComponent,
  },
  {
    path: 'gestion-pate',
    component: GestionPateComponent,
  },
  {
    path: 'gestion-territoire',
    component: GestionTerritoireComponent,
  },
  {
    path: '',
    redirectTo: '/gestion-parcelle',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/gestion-parcelle',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
