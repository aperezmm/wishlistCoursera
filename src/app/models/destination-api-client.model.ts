import { TravelDestinationModel } from './travel-destination.model';

export class DestinationApiClient {
    destinations: TravelDestinationModel[];

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
            return dest.id.toString() == id;
        })[0];
    }
}