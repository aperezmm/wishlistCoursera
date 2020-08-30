import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, APP_INITIALIZER, Injectable, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationComponent } from './components/destination/destination.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { FormsDestinationTravelComponent } from './components/forms-destination-travel/forms-destination-travel.component';
import { HttpClientModule, HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import ngx-mapbox-gl
// import { MAPBOX_API_KEY, NgxMapboxGLModule } from 'ngx-mapbox-gl';


import  Dexie  from 'dexie';

import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { DestinationApiClient } from './models/destination-api-client.model';
import { TravelsDestinationsState, 
  reducerTravelsDestinations, 
  initializeTravelsDestinationsState, 
  TravelsDestinationsEffects,
  InitMyDataAction} from './models/travel-destination-state.model';
import { ActionReducerMap, StoreModule as NgRxStoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UserLoginGuard } from './guards/user-login/user-login.guard';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightsMainComponent } from './components/flights-main/flights-main.component';
import { FlightsDetailComponent } from './components/flights-detail/flights-detail.component';
import { FlightsInfoComponent } from './components/flights-info/flights-info.component';
import { ReservationsModule } from './reservations/reservations.module';
import { async } from 'rxjs/internal/scheduler/async';
import { TravelDestinationModel } from './models/travel-destination.model';
import { Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { SpyOnMeDirective } from './spy-on-me.directive';

export interface IMyLibMapModuleConfig {
  mapboxToken: string;
}

//App config
export interface AppConfig {
  apiEndPoint: String;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
//Fin app config 


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

//app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeTravelsDestinationsState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient){ }
  async initializeTravelsDestinationsState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-segurity'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', {headers: headers});
    const response: any = await this.http.request(req).toPromise();

    //Body array de strings
    this.store.dispatch(new InitMyDataAction(response.body));
  }
    
}

//end app init

/*
//Indexed database
@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  //Por debajo usa indexed database
  destinations: Dexie.Table<TravelDestinationModel, number>;
  constructor(){
    super('MyDataBase');
    //Primera versión de nuestra base de datos
    this.version(1).stores({
      destinations: '++id, name, url',
    });
  }
}
*/

//Save in the storageLocal 
export class Translation {
  constructor(public id:number, public lang: string, public key: string, public value: string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  destinations: Dexie.Table<TravelDestinationModel, number>;
  translations: Dexie.Table<Translation, number>;
  constructor(){
    super('MyDataBase');
    //Version uno
    this.version(1).stores({
      destinations: '++id, name, url'
    });
    //Versionado de base de datos
    this.version(2).stores({
      destinations: '++id, name, url',
      translations: '++id, lang, key, value'
    });
  }
}

//Inicializamos la db
export const db = new MyDataBase();

//end Dexie

class TranslationLoader implements TranslationLoader {
  constructor(private http: HttpClient){

  }

  getTranslation(lang: string): Observable<any>{
    const promise = db.translations
    //Consultas Dexia
      .where('lang')
      .equals(lang)
      .toArray()
      .then(results => {
        if(results.length === 0){
          return this.http
            .get<Translation[]>(APP_CONFIG_VALUE.apiEndPoint + '/api/translation?lang=' + lang)
            .toPromise()
            .then(apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }
        return results;
      }).then((twoTranslations) => {
        console.log('Traduccione cargadas: ');
        console.log(twoTranslations);
        return twoTranslations;
      }).then((TwoTranslations) => {
        return TwoTranslations.map((t) => ({[t.key]: t.value}));
      });
    return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient){
  return new TranslationLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    DestinationComponent,
    DestinationListComponent,
    DestinationDetailComponent,
    FormsDestinationTravelComponent,
    LoginComponent,
    ProtectedComponent,
    FlightsComponent,
    FlightsMainComponent,
    FlightsDetailComponent,
    FlightsInfoComponent,
    SpyOnMeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }), //Registramos los reducers
    EffectsModule.forRoot([TravelsDestinationsEffects]),
    StoreDevtoolsModule.instrument(),
    ReservationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    //DestinationApiClient,
    AuthService,
    UserLoginGuard,
    //Agregamos el provider para un injectionToken
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDataBase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


