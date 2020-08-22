import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiClientService {

  constructor() {
  }

  getAll(){
    //Devuelve un array de objetos.
    return [{ id:121, destination: 'Barcelona'}, {id:223, destination: 'Madrid'}];
  }
}
