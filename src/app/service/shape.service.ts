import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  constructor(private http: HttpClient) {}

  getParcellesShapes() {
    return this.http.get(environment.apiUrl + '/parcelle');
  }

  //send a delete request to the API parcelle with the list of id in the body we want to delete. The ids are string, and we send a delete request
  deleteParcelles(ids: string[]) {
    return this.http.delete(environment.apiUrl + '/parcelle', {
      body: ids,
    });
  }

  //send a get request to the API generatePateTemporaires
  generatePateTemporaires() {
    return this.http.get(environment.apiUrl + '/generatePateTemporaires');
    // return this.http.get('assets/data/pates.json');
  }
}
