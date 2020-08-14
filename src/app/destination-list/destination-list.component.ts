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

  constructor(public destinationApiClient: DestinationApiClient) {
    this.onItemAdded = new EventEmitter();
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
    this.destinationApiClient.getAll().forEach(x => x.setSelected(false));
    desti.setSelected(true);
  }


}
