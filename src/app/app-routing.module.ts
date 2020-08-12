import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: DestinationListComponent},
  { path: 'destination-detail', component: DestinationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Vinculamos las rutas
  exports: [RouterModule]
})
export class AppRoutingModule { }
