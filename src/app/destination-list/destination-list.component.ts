import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelDestinationModel } from '../models/travel-destination.model';
import { DestinationApiClient } from '../models/destination-api-client.model';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<TravelDestinationModel>;
  updates: string[];

  constructor(public destinationApiClient: DestinationApiClient) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinationApiClient.subscribeOnChange((dest: TravelDestinationModel)=> {
      if(dest != null) { //Empieza por defecto en null, cuando nos subscribamos la primera vez tendra 
        //el primer valor que fue null
        this.updates.push('You have seen details of : '+ dest.name); //Aquí estamos actualizando.

      }
    });
  }

  ngOnInit() {

  }

  //GUARDAR EL DESTINO EN LA CARD
  addedDestination(desti: TravelDestinationModel) {
    this.destinationApiClient.add(desti);
    this.onItemAdded.emit(desti);
  }

  //ESCOGER EL DESTINO Y DESMARCAR LOS DEMÁS. 
  chosenDestination(desti: TravelDestinationModel){
    this.destinationApiClient.choose(desti); //Le pasamos la responsabilidad a destinationApiClient
  }


}
