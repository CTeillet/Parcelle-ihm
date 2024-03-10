import { Injectable } from '@angular/core';
import { PlotProperties } from '../../model/plot.model';
import { Feature, Geometry } from 'geojson';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  makePlotPopUp(feature: Feature<Geometry, PlotProperties>): string {
    return (
      `<div>Ville : ${feature.properties.town}</div>` +
      `<div>Surface : ${feature.properties.area}</div>` +
      `<div>Adresse : ${feature.properties.address}</div>` +
      `<button class="add-shape">Add</button>` +
      `<button class="remove-shape">Remove</button>`
    );
  }

  makeBlockPopUp(): string {
    return (
      `<button class="add-shape">Add</button>` +
      `<button class="remove-shape">Remove</button>`
    );
  }
}
