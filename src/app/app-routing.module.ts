import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { publicRoutes } from './public/public-routing.module';
import { protectedRoutes } from './protected/protected-routing.module';

export const routes: Routes = [
  {
    path: 'public',
    children: publicRoutes,
  },
  {
    path: 'protected',
    children: protectedRoutes,
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
