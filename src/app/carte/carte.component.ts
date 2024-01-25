import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoJSON, latLng, Layer, PopupEvent, tileLayer } from 'leaflet';
import { Feature, Geometry } from 'geojson';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css'],
})
export class CarteComponent implements OnChanges {
  @Input()
  public data!: GeoJSON.GeoJsonObject;

  @Input()
  public createPopUp!: (feature: Feature<Geometry, string>) => string;

  protected map!: L.Map;

  private readonly _SELECTED_COLOR = '#FAE042';

  private readonly _NOT_SELECTED_COLOR = '#6DB65B';

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 15,
    center: latLng(48.707216, 2.368604),
  };

  @Output()
  private selectionChange = new EventEmitter<string[]>();
  @Input()
  public selection = [] as string[];

  private readonly defaultStyleFeature = {
    weight: 3,
    opacity: 0.5,
    color: '#008f68',
    fillOpacity: 0.8,
    fillColor: this._NOT_SELECTED_COLOR,
  };

  private initParcellesLayer() {
    const parcelleLayer = L.geoJSON(this.data, {
      style: () => this.defaultStyleFeature,
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: e => this.highlightFeature(e.target),
          mouseout: e => this.resetFeature(e.target),
        });
        this.bindPopUpAction(layer, feature);
      },
    });
    this.map.addLayer(parcelleLayer);
    parcelleLayer.bringToBack();
  }

  private resetFeature(layer: unknown) {
    const fillColor = this.getFillColor(layer);
    // @ts-expect-error Don't know the type of layer TODO: fix this
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: fillColor,
    });
  }

  private getFillColor(layer: unknown) {
    // @ts-expect-error Don't know the type of layer TODO: fix this
    return this.selection.includes(layer.feature?.properties.id)
      ? this._SELECTED_COLOR
      : this._NOT_SELECTED_COLOR;
  }

  private bindPopUpAction(layer: Layer, feature: Feature<Geometry, unknown>) {
    // @ts-expect-error Don't know the type of feature TODO: fix this
    layer.bindPopup(this.createPopUp(feature)).on('popupopen', e => {
      const popUp = e.target.getPopup();
      popUp
        .getElement()
        .querySelector('.add-shape')
        .addEventListener('click', () => this.addToSelection(feature, e));
      popUp
        .getElement()
        .querySelector('.remove-shape')
        .addEventListener('click', () => this.removeFromSelection(feature, e));
    });
  }

  private addToSelection(feature: Feature<Geometry, unknown>, e: PopupEvent) {
    // @ts-expect-error Don't know the type of feature TODO: fix this
    this.selection.push(feature.properties.id);
    this.selectionChange.emit(this.selection);
    this.resetFeature(e.target);
    console.log(this.selection);
  }

  private removeFromSelection(
    feature: Feature<Geometry, unknown>,
    e: PopupEvent
  ) {
    // @ts-expect-error Don't know the type of feature TODO: fix this
    this.selection = this.selection.filter(id => id !== feature.properties.id);
    this.selectionChange.emit(this.selection);
    this.resetFeature(e.target);
  }

  protected clearSelection() {
    this.selection = [];
    this.selectionChange.emit(this.selection);
    this.map.eachLayer(layer => {
      if (layer instanceof GeoJSON) {
        this.resetFeature(layer);
      }
    });
  }

  private highlightFeature(layer: unknown) {
    // @ts-expect-error Don't know the type of layer TODO: fix this
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['data']?.currentValue) {
      console.log('data changed');
      this.initParcellesLayer();
    } else if (changes['selection']) {
      console.log('selection changed');
      if (changes['selection'].previousValue?.length >= 0) {
        const diff = changes['selection'].previousValue.filter(
          (x: string) => !changes['selection'].currentValue.includes(x)
        );
        console.log(diff);
        this.map.eachLayer(layer => {
          if (layer instanceof GeoJSON) {
            console.log(layer);
            this.resetFeature(layer);
          }
        });
      }
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }
}
