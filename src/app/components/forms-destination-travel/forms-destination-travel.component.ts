import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelDestinationModel } from '../../models/travel-destination.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, Form } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  searchResults: string[];

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
        console.log('name changed:', value);
      }
    );
  } 

  ngOnInit(): void {
    let elemName = <HTMLInputElement>document.getElementById('name'); //Elegimos el elemento del html
    //subscribirno cuando nos presionan tecla
    fromEvent(elemName, 'input') //Pipe sirve para operaciones en serie
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value), //Cada evento del teclado tiene un target
        filter(text => text.length > 2), //Entra ese string si tiene más de 2 caracteres
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax('/assets/datos.json')) //Como webserver
        //consultamos un archivo de texto estatico.
        //le pasamos el texto de busquedad 
      
      ).subscribe(ajaxResponse => {
        this.searchResults = ajaxResponse.response
        .filter(function(x){
          return x.toLowerCase().includes(elemName.value.toLowerCase());
        });
      });
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
      let length = control.value.toString().trim().length; //Length
      if(length > 0 && length < minLength ){
        return {'minLengthName': true};
      }
      return null //Retornamos null por defecto
    };
  }
}
