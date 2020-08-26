import { Component, OnInit} from '@angular/core';
import { TravelDestinationModel } from '../../models/travel-destination.model';
import { ActivatedRoute } from '@angular/router';
import { DestinationApiClient } from '../../models/destination-api-client.model';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css'],
  providers: [
    DestinationApiClient      
  ]
})
export class DestinationDetailComponent implements OnInit {

  destination: TravelDestinationModel;

  constructor(public route: ActivatedRoute, public destinationApiClient: DestinationApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destination = this.destinationApiClient.getById(id);
    //console.log(id + 'despues');
    //destinationApiClient.getById(id);
  }

}
