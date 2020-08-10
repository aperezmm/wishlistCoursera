import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { TravelDestinationModule } from '../models/travel-destination.module';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  @Input() destination: TravelDestinationModule;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<TravelDestinationModule>; //Valor de salida
  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  //PARA EL EVENTO
  goDestination(){
    this.clicked.emit(this.destination);
    return false;
  }

}
