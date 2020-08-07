export class TravelDestinationModule {
    name:string;
    url:string;

    constructor(public n:string, public u:string){
        this.name = n;
        this.url = u;
    }
}