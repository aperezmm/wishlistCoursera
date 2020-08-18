import { v4 as uuid} from 'uuid';

export class TravelDestinationModel {
    public selected: boolean;
    public services: string[];
    id = uuid();

    constructor(public name:string, public url:string, public votes:number = 0){
        this.services = ['Turco', 'Sauna', 'Jacuzzi'];
    }

    //BOTON IR
    isSelected(): boolean {
        return this.selected;
    }

    setSelected(is: boolean) {
        this.selected = is;
    }

    voteUp(){
        this.votes++;
    }

    voteDown(){
        this.votes--;
    }
}