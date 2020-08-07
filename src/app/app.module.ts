import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationComponent } from './destination/destination.component';
import { DestinationListComponent } from './destination-list/destination-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinationComponent,
    DestinationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
