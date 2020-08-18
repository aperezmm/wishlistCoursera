import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelDestinationModel } from '../models/travel-destination.model';
import { DestinationApiClient } from '../models/destination-api-client.model';
import { Store, State } from '@ngrx/store';
import { AppState } from '../app.module';
import { NewDestinationAction, ChoosenFavoriteAction } from '../models/travel-destination-state.model';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<TravelDestinationModel>;
  updates: string[];
  all;

  constructor(public destinationApiClient: DestinationApiClient, public store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinations.favorite)
      .subscribe(d => {
        if(d != null) {
          this.updates.push("You have been choosen: " + d.name);
        }
      });
      store.select(state => state.destinations.items).subscribe(items => this.all = items);
  }

  ngOnInit() {
    
  }

  //GUARDAR EL DESTINO EN LA CARD
  addedDestination(desti: TravelDestinationModel) {
    this.destinationApiClient.add(desti);
    this.onItemAdded.emit(desti);
    //this.store.dispatch(new NewDestinationAction(desti)); //Despachamos acciones
  }

  //ESCOGER EL DESTINO Y DESMARCAR LOS DEMÁS. 
  chosenDestination(desti: TravelDestinationModel){
    this.destinationApiClient.choose(desti); //Le pasamos la responsabilidad a destinationApiClient
    //this.store.dispatch(new ChoosenFavoriteAction(desti));
  }

  getAll(){

  }


}
