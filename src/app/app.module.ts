import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarkerService } from './service/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { PopUpService } from './service/popup.service';
import { ShapeService } from './service/shape.service';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GestionParcelleComponent } from './gestion-parcelle/gestion-parcelle.component';
import { GestionPateComponent } from './gestion-pate/gestion-pate.component';
import { GestionTerritoireComponent } from './gestion-territoire/gestion-territoire.component';
import { CarteComponent } from './carte/carte.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GestionParcelleComponent,
    GestionPateComponent,
    GestionTerritoireComponent,
    CarteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [MarkerService, PopUpService, ShapeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
