import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationComponent } from './components/destination/destination.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { FormsDestinationTravelComponent } from './components/forms-destination-travel/forms-destination-travel.component';
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
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UserLoginGuard } from './guards/user-login/user-login.guard'

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
    FormsDestinationTravelComponent,
    LoginComponent,
    ProtectedComponent
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
    DestinationApiClient,
    AuthService,
    UserLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
