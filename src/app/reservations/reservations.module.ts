import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationApiClientService } from './reservation-api-client.service';


@NgModule({
  declarations: [ReservationListComponent, ReservationDetailComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule
  ],
  providers: [
    ReservationApiClientService
  ]
})
export class ReservationsModule { }
