import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoJSON, Layer, PopupEvent } from 'leaflet';
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
export class CarteComponent implements OnInit, OnChanges {
  @Input()
  public data!: GeoJSON.GeoJsonObject;

  @Input()
  public createPopUp!: (feature: Feature<Geometry, string>) => string;

  protected map!: L.Map;

  private readonly _SELECTED_COLOR = '#FAE042';

  private readonly _NOT_SELECTED_COLOR = '#6DB65B';

  @Output()
  private selectionEvent = new EventEmitter<string[]>();
  private selection = [] as string[];

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [48.707216, 2.368604],
      zoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

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

  private resetFeature(layer: any) {
    const fillColor = this.getFillColor(layer);
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: fillColor,
    });
  }

  private getFillColor(layer: any) {
    return this.selection.includes(layer.feature?.properties.id)
      ? this._SELECTED_COLOR
      : this._NOT_SELECTED_COLOR;
  }

  private bindPopUpAction(layer: Layer, feature: Feature<Geometry, any>) {
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

  private addToSelection(feature: Feature<Geometry, any>, e: PopupEvent) {
    this.selection.push(feature.properties.id);
    this.selectionEvent.emit(this.selection);
    this.resetFeature(e.target);
  }

  private removeFromSelection(feature: Feature<Geometry, any>, e: PopupEvent) {
    this.selection = this.selection.filter(id => id !== feature.properties.id);
    this.selectionEvent.emit(this.selection);
    this.resetFeature(e.target);
  }

  protected clearSelection() {
    this.selection = [];
    this.selectionEvent.emit(this.selection);
    this.map.eachLayer(layer => {
      if (layer instanceof GeoJSON) {
        this.resetFeature(layer);
      }
    });
  }

  private highlightFeature(layer: any) {
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
    if (changes['data'].currentValue) {
      this.initParcellesLayer();
    }
  }

  protected readonly console = console;
}
