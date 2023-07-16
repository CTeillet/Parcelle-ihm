import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }

  makeShapePopup(data: any): string {
    return `` +
      `<div>Ville : ${ data.properties.commune }</div>` +
      `<div>Surface : ${ data.properties.surface }</div>` +
      `<div>Adresse : ${ data.properties.adresse }</div>` +
      // add a button to delete the shape that call the function deleteShape
      `<button class="add-shape">Add</button>` +
      `<button class="remove-shape">Remove</button>`
  }
}
