export class TravelDestinationModule {
    name:string;
    url:string;
    private selected: boolean;

    constructor(public n:string, public u:string){
        this.name = n;
        this.url = u;
    }

    //BOTON IR
    isSelected(): boolean {
        return this.selected;
    }

    setSelected(is: boolean) {
        this.selected = is;
    }
}