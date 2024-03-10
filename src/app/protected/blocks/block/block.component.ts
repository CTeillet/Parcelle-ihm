import { AfterViewInit, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MapComponent } from '../../shared/map/map.component';
import { PlotService } from '../../core/plot.service';
import { PopUpService } from '../../core/popup.service';
import { GeoJSON } from 'leaflet';
import { Geometry } from 'geojson';
import { PlotProperties } from '../../../model/plot.model';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [MatButton, MapComponent],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css',
})
export class BlockComponent implements AfterViewInit {
  protected selection = [] as string[];
  protected blocks!: GeoJSON.FeatureCollection<Geometry, PlotProperties>;

  constructor(
    private plotService: PlotService,
    public popupService: PopUpService
  ) {}

  ngAfterViewInit(): void {
    this.plotService
      .getBlock()
      .subscribe(
        (blocks: GeoJSON.FeatureCollection<Geometry, PlotProperties>) => {
          this.blocks = blocks;
        }
      );
  }
}
