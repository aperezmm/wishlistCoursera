export class TravelDestinationModule {
    name:string;
    url:string;
    private selected: boolean;
    public services: string[];

    constructor(public n:string, public u:string){
        this.name = n;
        this.url = u;
        this.services = ['Turco', 'Sauna', 'Jacuzzi'];
    }

    //BOTON IR
    isSelected(): boolean {
        return this.selected;
    }

    setSelected(is: boolean) {
        this.selected = is;
    }
}