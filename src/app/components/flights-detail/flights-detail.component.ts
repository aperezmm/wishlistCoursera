import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flights-detail',
  templateUrl: './flights-detail.component.html',
  styleUrls: ['./flights-detail.component.css']
})
export class FlightsDetailComponent implements OnInit {
  id: any;

  constructor(public route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id'];  //Sale de la configuracion de la ruta
    });
   }

  ngOnInit(): void {
  }

}
