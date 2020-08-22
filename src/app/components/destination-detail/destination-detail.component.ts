import { Component, OnInit, InjectionToken, Inject, Injectable } from '@angular/core';
import { TravelDestinationModel } from '../../models/travel-destination.model';
import { ActivatedRoute } from '@angular/router';
import { DestinationApiClient } from '../../models/destination-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';

class DestinationApiClientOld {

  //Debe tener funciones similares con la original
  getById(id:String):TravelDestinationModel{
    console.log('LLamado por clase vieja');
    return null;
  }
}


interface AppConfig {
  apiEndPoint: String;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable({
  providedIn: 'root'
})

class DestinationApiClientDecorated extends DestinationApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>){
    super(store);
  }
  getById(id:String):TravelDestinationModel {
    console.log('Llamado por la clase decorada');
    console.log('config: ' +this.config.apiEndPoint);
    return super.getById(id);
  }
}

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css'],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    {provide: DestinationApiClient, useClass: DestinationApiClientDecorated },
    {provide: DestinationApiClientOld, useExisting: DestinationApiClient}
    
     
  ]
})
export class DestinationDetailComponent implements OnInit {

  destination: TravelDestinationModel;

  constructor(public route: ActivatedRoute, public destinationApiClient: DestinationApiClientOld) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.destination = this.destinationApiClient.getById(id);
    console.log(id + 'despues');
    //destinationApiClient.getById(id);
  }

}
