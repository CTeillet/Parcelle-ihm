import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../service/marker.service';
import {ShapeService} from '../service/shape.service';
import {PopUpService} from "../service/popup.service";
import {Layer, PopupEvent} from "leaflet";
import {firstValueFrom} from "rxjs";

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
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  // @ts-ignore
  private map;
  // @ts-ignore
  private parcelles;

  private selection = [] as string[];
  // @ts-ignore
  private pateTemporaires;

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService,
    private popupService: PopUpService
  ) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [48.707216, 2.368604],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  // @ts-ignore
  private highlightFeature(layer) {
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private readonly _SELECTED_COLOR = '#FAE042';

  private readonly _NOT_SELECTED_COLOR = '#6DB65B';

  private resetFeature(layer: any) {
    let fillColor = (this.selection.includes(layer.feature?.properties.id))?this._SELECTED_COLOR:this._NOT_SELECTED_COLOR;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: fillColor
    });
  }

  private initStatesLayer() {
    const parcelleLayer = L.geoJSON(this.parcelles, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: this._NOT_SELECTED_COLOR
      }),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => (this.highlightFeature(e.target)),
          mouseout: (e) => (this.resetFeature(e.target)),
        });
        this.bindPopUpAction(layer, feature);
      }
    });

    this.map.addLayer(parcelleLayer);
    parcelleLayer.bringToBack();
  }

  // @ts-ignore
  private bindPopUpAction<G, P>(layer: Layer, feature: Feature<G, P>) {
    layer.bindPopup(this.popupService.makeShapePopup(feature))
      .on("popupopen", (e) => {
        const popUp = e.target.getPopup();
        popUp.getElement()
          .querySelector(".add-shape")
          .addEventListener("click", () => this.addToSelection(feature, e));
        popUp.getElement()
          .querySelector(".remove-shape")
          .addEventListener("click", () => this.removeFromSelection(feature, e));
      });
  }

// @ts-ignorede
  private addToSelection<G, P>(feature: Feature<G, P>, e: PopupEvent) {
    this.selection.push(feature.properties.id);
    this.resetFeature(e.target);
  }

// @ts-ignore
  private removeFromSelection<G, P>(feature: Feature<G, P>, e: PopupEvent) {
    this.selection = this.selection.filter((id) => id !== feature.properties.id);
    this.resetFeature(e.target);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.shapeService.getParcellesShapes().subscribe((parcelles: any) => {
      this.parcelles = parcelles;
      this.initStatesLayer();
    });
  }

  deleteParcelles() {
    firstValueFrom(this.shapeService.deleteParcelles(this.selection)).then((response: any) => {
      console.log(response);
      // Suppression des elements de la selection dans la liste des parcelles
      this.parcelles.features = this.parcelles.features.filter((feature: any) => !this.selection.includes(feature.properties.id));

      // Mise à jour de la carte
      this.map.remove();
      this.initMap();

      // Mise à jour de la couche des parcelles
      this.initStatesLayer();

      this.selection = [];
    }).catch(reason => {
      console.log(reason);
    });
  }

  generationPatesTemporaire() {
    //call the service generatePateTemporaires
    this.shapeService.generatePateTemporaires().subscribe((response: any) => {
      console.log(response);
      this.pateTemporaires = response;
      this.initStatesLayerPate();
    });
  }

  private initStatesLayerPate() {
    const parcelleLayer = L.geoJSON(this.pateTemporaires, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#b743b4',
        fillOpacity: 0.8,
        fillColor: '#b743b4'
      }),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => (this.highlightFeature(e.target)),
          mouseout: (e) => (this.resetFeature(e.target)),
        });
        // this.bindPopUpAction(layer, feature);
      }
    });

    this.map.addLayer(parcelleLayer);
    parcelleLayer.bringToBack();
  }
}
