import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  constructor(private http: HttpClient) {}

  getParcellesShapes() {
    return this.http.get('http://localhost:8080/parcelle');
    // return this.http.get('assets/data/parcelles.json');
    // return this.http.get('assets/data/parcelle1.json');
  }

  //send a delete request to the API parcelle with the list of id in the body we want to delete. The ids are string, and we send a delete request
  deleteParcelles(ids: string[]) {
    return this.http.delete('http://localhost:8080/parcelle', {
      body: ids,
    });
  }

  //send a get request to the API generatePateTemporaires
  generatePateTemporaires() {
    return this.http.get('http://localhost:8080/generatePateTemporaires');
    // return this.http.get('assets/data/pates.json');
  }
}
