import { TravelDestinationModel } from './travel-destination.model';
import { Subject, BehaviorSubject, from } from 'rxjs';
import { tap, last } from 'rxjs/operators';
import { Action, Store, State } from '@ngrx/store';
import { TravelsDestinationsState, 
    NewDestinationAction,
    ChoosenFavoriteAction} from './travel-destination-state.model'
import {AppState, APP_CONFIG, AppConfig, db} from './../app.module';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable() 
export class DestinationApiClient {
    
   destinations: TravelDestinationModel[]=[];

    //Se le pasa al constructor BehaviorSubject el valor por defecto.
   // current: Subject<TravelDestinationModel> = new BehaviorSubject<TravelDestinationModel>(null);

    constructor(public store: Store<AppState>,
        @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
        private http: HttpClient){    
            //Usamos el httpClient para hacer llamadas al webServer
        this.store.select(state => state.destinations)
            .subscribe((data) => {
                console.log('destinations sub store');
                console.log(data);
                this.destinations = data.items;
            });

            this.store.subscribe((data) => {
                console.log('all store');
                console.log(data);
            });
    }

    add(dest: TravelDestinationModel){
        //this.store.dispatch(new NewDestinationAction(dest));

        //Informacion en forma de diccionario (clave -> valor)
        const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-segurity'});

        //Estamos enviando información a una url
        const req = new HttpRequest('POST', this.config.apiEndPoint + '/my', {new: dest.name},
            {headers: headers });
        //Crea el request y nos subscribimos a ese request http
        this.http.request(req).subscribe((data: HttpResponse<{}>) => {
            //Cuando el server responde bien
            if(data.status === 200){
                this.store.dispatch(new NewDestinationAction(dest));
                //Agregamos a la base de datos
                const myDb = db;
                myDb.destinations.add(dest);
                console.log('Todos los destinos de la DB');
                myDb.destinations.toArray().then(destinations => console.log(destinations))
            }
        });
    }

    
    getById(id: String):TravelDestinationModel{
        return this.destinations.filter(function(dest){
            return dest.id.toString() == id;
        })[0];
    }

    getAll():TravelDestinationModel[] {
        return this.destinations;
    }
    

    choose(dest: TravelDestinationModel){
        this.store.dispatch(new ChoosenFavoriteAction(dest));
    }

    //Encapsular
    /*
    subscribeOnChange(fn){
        this.current.subscribe(fn);
    }
    */
}