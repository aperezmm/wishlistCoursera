import { TravelDestinationModel } from './travel-destination.model';
import { Subject, BehaviorSubject } from 'rxjs';

export class DestinationApiClient {
    destinations: TravelDestinationModel[];

    //Se le pasa al constructor BehaviorSubject el valor por defecto.
    current: Subject<TravelDestinationModel> = new BehaviorSubject<TravelDestinationModel>(null);

    constructor(){
        this.destinations = [];
    }

    add(dest: TravelDestinationModel){
        this.destinations.push(dest);
    }

    getAll():TravelDestinationModel[]{
        return this.destinations;
    }

    getById(id: string):TravelDestinationModel{
        return this.destinations.filter(function(dest){
            return dest.id.toString() === id;
        })[0];
    }

    choose(dest: TravelDestinationModel){
        this.destinations.forEach(x => x.setSelected(false));
        dest.setSelected(true);
        this.current.next(dest);
    }

    //Encapsular
    subscribeOnChange(fn){
        this.current.subscribe(fn);
    }
}