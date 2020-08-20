import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { Route} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: DestinationListComponent},
  { path: 'destination/:id', component: DestinationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Vinculamos las rutas
  exports: [RouterModule]
})
export class AppRoutingModule { }

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}
