import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Geometry } from 'geojson';
import { PlotProperties } from '../../model/plot.model';
import { Observable } from 'rxjs';
import { GeoJSON } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class PlotService {
  constructor(private http: HttpClient) {}

  getPlotsShapes(): Observable<
    GeoJSON.FeatureCollection<Geometry, PlotProperties>
  > {
    return this.http.get<GeoJSON.FeatureCollection<Geometry, PlotProperties>>(
      environment.dev.serverUrl + '/api/private/parcelle'
    );
  }

  //send a delete request to the API parcelle with the list of id in the body we want to delete. The ids are string, and we send a delete request
  deletePlots(ids: string[]) {
    return this.http.delete(
      environment.dev.serverUrl + '/api/private/parcelle',
      {
        body: ids,
      }
    );
  }

  //send a get request to the API generatePateTemporaires
  generatePateTemporaires() {
    return this.http.get(
      environment.dev.serverUrl + '/api/private/generatePateTemporaires'
    );
  }

  generateBlock(selection: string[]) {
    return this.http.post(
      environment.dev.serverUrl + '/api/private/block',
      selection
    );
  }

  getBlock(): Observable<GeoJSON.FeatureCollection<Geometry, PlotProperties>> {
    return this.http.get<GeoJSON.FeatureCollection<Geometry, PlotProperties>>(
      environment.dev.serverUrl + '/api/private/block'
    );
  }
}
