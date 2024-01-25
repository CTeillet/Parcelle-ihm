import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  makeShapePopup(data: unknown): string {
    return (
      `` +
      // @ts-expect-error TODO: fix this
      `<div>Ville : ${data.properties.commune}</div>` +
      // @ts-expect-error TODO: fix this
      `<div>Surface : ${data.properties.surface}</div>` +
      // @ts-expect-error TODO: fix this
      `<div>Adresse : ${data.properties.adresse}</div>` +
      // add a button to delete the shape that call the function deleteShape
      `<button class="add-shape">Add</button>` +
      `<button class="remove-shape">Remove</button>`
    );
  }
}
