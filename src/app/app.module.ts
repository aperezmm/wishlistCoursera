import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationComponent } from './destination/destination.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { FormsDestinationTravelComponent } from './forms-destination-travel/forms-destination-travel.component';
import { DestinationApiClient } from './models/destination-api-client.model';

@NgModule({
  declarations: [
    AppComponent,
    DestinationComponent,
    DestinationListComponent,
    DestinationDetailComponent,
    FormsDestinationTravelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DestinationApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
