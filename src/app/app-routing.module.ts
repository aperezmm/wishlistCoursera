import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { Route} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UserLoginGuard } from './guards/user-login/user-login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: DestinationListComponent},
  { path: 'destination/:id', component: DestinationDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'protected',
    component: ProtectedComponent,
    canActivate: [UserLoginGuard] //Para controlar que este log
    }
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
