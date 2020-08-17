import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TravelDestinationModel } from './travel-destination.model';

//State

//Estado global de la APP
export interface TravelsDestinationsState {
    items: TravelDestinationModel[];
    loading: boolean;
    favorite: TravelDestinationModel;
}

export const initializeTravelsDestinationsState = function() {
    return {
        items: [],
        loading: false,
        favorite: null
    };
};

//Actions
//Disparan un cambio de estado
export enum TravelsDestinationsActionsTypes {
    //Definiendo los strings
    NEW_DESTINATION = '[Travels Destinations] NEW',
    CHOOSEN_FAVORITE = '[Travels Destinations] FAVORITE' 
}

//Estructura de dato destino nuevo
export class NewDestinationAction implements Action{
    type = TravelsDestinationsActionsTypes.NEW_DESTINATION;
    constructor(public destination: TravelDestinationModel){

    }
}

//Estructura de dato destino elegido 
export class ChoosenFavoriteAction implements Action{
    type = TravelsDestinationsActionsTypes.CHOOSEN_FAVORITE;
    constructor(public destination: TravelDestinationModel){

    }
}

//Agrupar todos los tipos de datos de las acciones de mi modulo
export type TravelsDestinationActions = NewDestinationAction | ChoosenFavoriteAction;

//Reducers

//Recibe el estado anterior del sistema, recibe la acción
export function reducerTravelsDestinations(
    state: TravelsDestinationsState,
    action: TravelsDestinationActions
): TravelsDestinationsState {
    switch(action.type) {
        case TravelsDestinationsActionsTypes.NEW_DESTINATION: {
            return {
                ...state,
                items: [...state.items, (action as NewDestinationAction).destination]
            };
        }
        case TravelsDestinationsActionsTypes.CHOOSEN_FAVORITE: {
            state.items.forEach(x => x.setSelected(false));
            const fav: TravelDestinationModel = (action as ChoosenFavoriteAction).destination;
            fav.setSelected(true);
            return {
                ...state,
                favorite: fav
            };
        }
    }
    return state;
}

//Effects


//Registrar una nueva acción, generando un nuevo estado
@Injectable()
export class TravelsDestinationsEffects {
    @Effect()
    newAdded$: Observable<Action> = this.actions$.pipe(
        ofType(TravelsDestinationsActionsTypes.NEW_DESTINATION), //Tipo de acción interesada
        map((action: NewDestinationAction) => new ChoosenFavoriteAction(action.destination))
    );

    constructor(private actions$: Actions){

    }
}