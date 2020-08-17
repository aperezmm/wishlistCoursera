import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelDestinationModel } from '../models/travel-destination.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, Form } from '@angular/forms';

@Component({
  selector: 'app-forms-destination-travel',
  templateUrl: './forms-destination-travel.component.html',
  styleUrls: ['./forms-destination-travel.component.css']
})
export class FormsDestinationTravelComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<TravelDestinationModel>;
  //Inicializamos el formGroup (fg, así lo llamamos en la vista)
  fg: FormGroup;
  minLength = 3;

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      //Definimos estructura del formulario
      name: ['', Validators.compose([
        Validators.required,
        //this.nameValidator,
        this.nameValidatorParametrizable(this.minLength)
      ])], //No debe estar vacío
      url: ['', Validators.required]
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
  
  /*

  --TAMBIÉN TIENE EN CUENTA LOS CARACTERES PERO NO MUESTRA EL MENSAJE

  nameValidator(control: FormControl): { [s: string]: boolean } {
    //evalua el control: FormControl
    const length = control.value.toString().trim().length; //Length
    if(length > 0 && length < 3){
      return {invalidName: true};
    }
    return null; //En otro caso
  }
  */

  nameValidatorParametrizable(minLength: number): ValidatorFn {  //Contando la cantidad de caracteres
    return (control: FormControl): { [s:string]: boolean } | null => {
      const length = control.value.toString().trim().length; //Length
      if(length > 0 && length < minLength ){
        return {minLengthName: true};
      }
      return null //Retornamos null por defecto
    }
  }
}
