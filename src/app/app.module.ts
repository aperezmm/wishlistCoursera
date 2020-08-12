import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationComponent } from './destination/destination.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinationComponent,
    DestinationListComponent,
    DestinationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
