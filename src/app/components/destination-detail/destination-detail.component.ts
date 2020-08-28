import { Component, OnInit} from '@angular/core';
import { TravelDestinationModel } from '../../models/travel-destination.model';
import { ActivatedRoute } from '@angular/router';
import { DestinationApiClient } from '../../models/destination-api-client.model';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

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
  map: mapboxgl.Map;

  constructor(public route: ActivatedRoute, public destinationApiClient: DestinationApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destination = this.destinationApiClient.getById(id);
    //console.log(id + 'despues');
    //destinationApiClient.getById(id);

    //Considera de cualquier tipo mapboxgl
    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    //Primero LNG, luego LAT 
    center: [-75.3864781, 6.0668847], // starting position
    zoom: 11 // starting zoom
    });

    this.createMarker(-75.3864781, 6.0668847);
    
  }

  createMarker(lng:number, lat:number){
    const marker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([lng, lat])
    .addTo(this.map);
  }

}
