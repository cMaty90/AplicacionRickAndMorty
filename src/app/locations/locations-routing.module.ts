import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListLocationsComponent } from './list-locations/list-locations.component';
import { SpecificLocationsComponent } from './specific-locations/specific-locations.component';
import { SearchedLocationsComponent } from './searched-locations/searched-locations.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:ListLocationsComponent
      },
      {
        path: ':id',
        component:SpecificLocationsComponent
      },
      {
        path: 'ubicacion-buscada/:name',
        component:SearchedLocationsComponent
      },
      {
        path: '**',
        component:ListLocationsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LocationsRoutingModule { }
