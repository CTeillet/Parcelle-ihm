import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../service/marker.service';
import { ShapeService } from '../service/shape.service';
import { PopUpService } from '../service/popup.service';
import { GeoJSON } from 'leaflet';

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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  protected map!: L.Map;
  protected parcelles!: GeoJSON.FeatureCollection;

  protected readonly console = console;

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService,
    public popupService: PopUpService
  ) {}

  ngAfterViewInit(): void {
    this.shapeService.getParcellesShapes().subscribe((parcelles: any) => {
      this.parcelles = parcelles;
    });
  }
  // deleteParcelles() {
  //   firstValueFrom(this.shapeService.deleteParcelles(this.selection))
  //     .then((response: any) => {
  //       console.log(response);
  //       // Suppression des elements de la selection dans la liste des parcelles
  //       this.parcelles.features = this.parcelles.features.filter(
  //         (feature: any) => !this.selection.includes(feature.properties.id)
  //       );
  //
  //       // Mise à jour de la carte
  //       this.map.remove();
  //       this.initMap();
  //
  //       // Mise à jour de la couche des parcelles
  //       this.initParcellesLayer();
  //
  //       this.selection = [];
  //     })
  //     .catch(reason => {
  //       console.log(reason);
  //     });

  // }
  // generationPatesTemporaire() {
  //   //call the service generatePateTemporaires
  //   this.shapeService.generatePateTemporaires().subscribe((response: any) => {
  //     console.log(response);
  //     this.pateTemporaires = response;
  //     this.initStatesLayerPate();
  //   });

  // }
  // private initStatesLayerPate() {
  //   const parcelleLayer = L.geoJSON(this.pateTemporaires, {
  //     style: feature => ({
  //       weight: 3,
  //       opacity: 0.5,
  //       color: '#b743b4',
  //       fillOpacity: 0.8,
  //       fillColor: '#b743b4',
  //     }),
  //     onEachFeature: (feature, layer) => {
  //       layer.on({
  //         mouseover: e => this.highlightFeature(e.target),
  //         mouseout: e => this.resetFeature(e.target),
  //       });
  //       // this.bindPopUpAction(layer, feature);
  //     },
  //   });
  //
  //   this.map.addLayer(parcelleLayer);
  //   parcelleLayer.bringToBack();
  // }
}
