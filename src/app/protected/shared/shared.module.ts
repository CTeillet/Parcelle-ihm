import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatButton } from '@angular/material/button';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, LeafletModule, MatButton],
  exports: [MapComponent],
})
export class SharedModule {}
