import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

//Archivo creado con el --flat --routing

//Utiliza sus propias rutas que son reservations y reservations/:id
const routes: Routes = [
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/:id', component: ReservationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
