import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelDestinationModel } from '../models/travel-destination.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forms-destination-travel',
  templateUrl: './forms-destination-travel.component.html',
  styleUrls: ['./forms-destination-travel.component.css']
})
export class FormsDestinationTravelComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<TravelDestinationModel>;
  //Inicializamos el formGroup (fg, así lo llamamos en la vista)
  fg: FormGroup;

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      //Definimos estructura del formulario
      name: [''],
      url: ['']
    });


    this.fg.valueChanges.subscribe(
      (form:any) => {
        console.log('form changed:', form);
      }
    );

    this.fg.controls['name'].valueChanges.subscribe(
      (value: string) => {
        console.log('name changed:', value)
      }
    );
  } 

  ngOnInit(): void {
  }

  saveDestination(name: string, url: string):boolean{
    let dest = new TravelDestinationModel(name, url);
    this.onItemAdded.emit(dest)  
    return false;
  }

}
