import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { TravelDestinationModel } from '../../models/travel-destination.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { VoteUpAction, VoteDownAction } from '../../models/travel-destination-state.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  @Input() destination: TravelDestinationModel;
  @Input("idx") position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() onClicked: EventEmitter<TravelDestinationModel>; //Valor de salida

  constructor(public store: Store<AppState>) {
    this.onClicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  //PARA EL EVENTO
  goDestination(){
    this.onClicked.emit(this.destination);
    return false;
  }

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.destination));
    return false; 
  }

  voteDown(){
    this.store.dispatch(new VoteDownAction(this.destination));
    return false;
  }

}
