import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TravelDestinationModule } from '../models/travel-destination.module';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  @Input() destination: TravelDestinationModule;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  constructor() { }

  ngOnInit(): void {
  }

}
