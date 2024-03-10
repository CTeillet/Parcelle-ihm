import { AfterViewInit, Component } from '@angular/core';
import { PlotService } from '../../core/plot.service';
import { PopUpService } from '../../core/popup.service';
import { firstValueFrom } from 'rxjs';
import { GeoJSON } from 'leaflet';
import { Geometry } from 'geojson';
import { PlotProperties } from '../../../model/plot.model';
import { MatButton } from '@angular/material/button';
import { MapComponent } from '../../shared/map/map.component';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css',
  standalone: true,
  imports: [MapComponent, MatButton],
})
export class PlotComponent implements AfterViewInit {
  protected selection = [] as string[];
  protected plots!: GeoJSON.FeatureCollection<Geometry, PlotProperties>;

  constructor(
    private shapeService: PlotService,
    public popupService: PopUpService
  ) {}

  ngAfterViewInit(): void {
    this.shapeService
      .getPlotsShapes()
      .subscribe(
        (parcelles: GeoJSON.FeatureCollection<Geometry, PlotProperties>) => {
          this.plots = parcelles;
        }
      );
  }

  deleteParcelles() {
    if (!this.selection) {
      return;
    }
    firstValueFrom(this.shapeService.deletePlots(this.selection))
      .then(() => {
        // Suppression des elements de la selection dans la liste des parcelles
        this.plots.features = this.plots.features.filter(
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
  // addSelection() {
  //   //Add element 910270000A0251 to the selection
  //   console.log(this.selection);
  // }

  generateBlock() {
    //call the service generateBlock
    this.shapeService
      .generateBlock(this.selection)
      .subscribe((response: unknown) => {
        console.log(response);
      });
  }
}
