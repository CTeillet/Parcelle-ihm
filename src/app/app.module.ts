import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {MarkerService} from "./service/marker.service";
import {HttpClientModule} from "@angular/common/http";
import {PopUpService} from "./service/popup.service";
import {ShapeService} from "./service/shape.service";
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    })
  ],
  providers: [
    MarkerService,
    PopUpService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
