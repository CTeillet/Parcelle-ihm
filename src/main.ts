import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { reducers, metaReducers } from './app/reducers';
import { StoreModule } from '@ngrx/store';
import { environment as env } from './environments/environment';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./app/public/public.routes'),
  },
  {
    path: 'protected',
    loadChildren: () => import('./app/protected/protected.routes'),
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AuthModule.forRoot({
        ...env.auth,
        httpInterceptor: {
          allowedList: [`${env.dev.serverUrl}/api/private/*`],
        },
      }),
      StoreModule.forRoot(reducers, {
        metaReducers,
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch(err => console.error(err));
