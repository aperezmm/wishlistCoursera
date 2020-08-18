import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationComponent } from './destination/destination.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { FormsDestinationTravelComponent } from './forms-destination-travel/forms-destination-travel.component';
import { DestinationApiClient } from './models/destination-api-client.model';
import { TravelsDestinationsState, 
  reducerTravelsDestinations, 
  initializeTravelsDestinationsState, 
  TravelsDestinationsEffects} from './models/travel-destination-state.model';
import { ActionReducerMap, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

//Redux init
export interface AppState { //Estado global de la aplicación.
  destinations: TravelsDestinationsState;

};

const reducers: ActionReducerMap<AppState> = { //Reduces globales de la aplicación
  destinations: reducerTravelsDestinations
};

const reducersInitialState = {
  destinations: initializeTravelsDestinationsState()
};

//Redux fin init



@NgModule({
  declarations: [
    AppComponent,
    DestinationComponent,
    DestinationListComponent,
    DestinationDetailComponent,
    FormsDestinationTravelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }), //Registramos los reducers
    EffectsModule.forRoot([TravelsDestinationsEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    DestinationApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
