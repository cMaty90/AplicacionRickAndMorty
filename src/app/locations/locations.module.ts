import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { ListLocationsComponent } from './list-locations/list-locations.component';
import { SpecificLocationsComponent } from './specific-locations/specific-locations.component';
import { SearchedLocationsComponent } from './searched-locations/searched-locations.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListLocationsComponent,
    SpecificLocationsComponent,
    SearchedLocationsComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    SharedModule
  ]
})
export class LocationsModule { }
