import { TravelDestinationModel } from './travel-destination.model';
import { Subject, BehaviorSubject, from } from 'rxjs';
import { tap, last } from 'rxjs/operators';
import { Action, Store, State } from '@ngrx/store';
import { TravelsDestinationsState, 
    NewDestinationAction,
    ChoosenFavoriteAction} from './travel-destination-state.model'
import {AppState} from './../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinationApiClient {
    destinations: TravelDestinationModel[]=[];

    //Se le pasa al constructor BehaviorSubject el valor por defecto.
   // current: Subject<TravelDestinationModel> = new BehaviorSubject<TravelDestinationModel>(null);

    constructor(public store: Store<AppState>){
        this.store
            .select(state => state.destinations)
            .subscribe((data) => {
                console.log("destinations sub store");
                console.log(data);
                this.destinations = data.items;
            });
        this.store
            .subscribe((data) => {
                console.log("all store");
                console.log(data);
            });            
    }

    add(dest: TravelDestinationModel){
        this.store.dispatch(new NewDestinationAction(dest));
    }

    getById(id: string):TravelDestinationModel{
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