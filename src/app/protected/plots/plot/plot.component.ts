import { AfterViewInit, Component } from '@angular/core';
import { ShapeService } from '../../../service/shape.service';
import { PopUpService } from '../../../service/popup.service';
import { firstValueFrom } from 'rxjs';
import { GeoJSON } from 'leaflet';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css',
})
export class PlotComponent implements AfterViewInit {
  protected selection = [] as string[];
  protected parcelles!: GeoJSON.FeatureCollection;

  // @ViewChild('map') map: CarteComponent | undefined;

  constructor(
    private shapeService: ShapeService,
    public popupService: PopUpService
  ) {}

  ngAfterViewInit(): void {
    this.shapeService.getParcellesShapes().subscribe((parcelles: unknown) => {
      // @ts-expect-error TODO: fix this
      this.parcelles = parcelles;
    });
  }

  // changeSelection($event: string[]) {
  //   console.log($event);
  //   this.selection = $event;
  // }

  deleteParcelles() {
    if (!this.selection) {
      return;
    }
    firstValueFrom(this.shapeService.deleteParcelles(this.selection))
      .then(() => {
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
  addSelection() {
    //Add element 910270000A0251 to the selection
    this.selection.push('910270000A0251');
    console.log(this.selection);
  }
}
