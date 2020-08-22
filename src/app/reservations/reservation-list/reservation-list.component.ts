import { Component, OnInit } from '@angular/core';
import { ReservationApiClientService } from '../reservation-api-client.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(public api: ReservationApiClientService) { }

  ngOnInit(): void {
  }

}
