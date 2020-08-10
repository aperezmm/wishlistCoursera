import { Component, OnInit } from '@angular/core';
import { TravelDestinationModule } from '../models/travel-destination.module';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {

  destinations: TravelDestinationModule[];
  constructor() {
    this.destinations = [];
  }

  ngOnInit(): void {

  }

  //GUARDAR EL DESTINO EN LA CARD
  saveDestination(name:string, url:string):boolean{
    this.destinations.push(new TravelDestinationModule(name,url));
    //console.log(this.destinations)
    return false; //Avoid loading the page
  }

  //ESCOGER EL DESTINO Y DESMARCAR LOS DEMÁS. 
  chosenDestination(dest: TravelDestinationModule){
    this.destinations.forEach(function(x){x.setSelected(false)});
    dest.setSelected(true); //disparamos el event
  }


}
