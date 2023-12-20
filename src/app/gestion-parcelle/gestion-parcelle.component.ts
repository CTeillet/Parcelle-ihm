import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ShapeService } from '../service/shape.service';
import { PopUpService } from '../service/popup.service';
import { firstValueFrom } from 'rxjs';
import { Feature } from 'geojson';
import { GeoJSON } from 'leaflet';
import { CarteComponent } from '../carte/carte.component';

@Component({
  selector: 'app-gestion-parcelle',
  templateUrl: './gestion-parcelle.component.html',
  styleUrls: ['./gestion-parcelle.component.css'],
})
export class GestionParcelleComponent implements AfterViewInit {
  private selection: string[] | undefined;
  protected parcelles!: GeoJSON.FeatureCollection;

  // @ViewChild('map') map: CarteComponent | undefined;

  constructor(
    private shapeService: ShapeService,
    public popupService: PopUpService
  ) {}

  ngAfterViewInit(): void {
    this.shapeService.getParcellesShapes().subscribe((parcelles: any) => {
      this.parcelles = parcelles;
    });
  }

  changeSelection($event: string[]) {
    this.selection = $event;
  }

  deleteParcelles() {
    if (!this.selection) {
      return;
    }
    firstValueFrom(this.shapeService.deleteParcelles(this.selection))
      .then((response: any) => {
        // Suppression des elements de la selection dans la liste des parcelles
        this.parcelles.features = this.parcelles.features.filter(
          feature => !this.selection?.includes(feature.properties?.['id'])
        );
        // this.map?.clearSelection();
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  // generationPatesTemporaire() {
  //   //call the service generatePateTemporaires
  //   this.shapeService.generatePateTemporaires().subscribe((response: any) => {
  //     console.log(response);
  //     this.pateTemporaires = response;
  //     this.initStatesLayerPate();
  //   });
  // }
}
