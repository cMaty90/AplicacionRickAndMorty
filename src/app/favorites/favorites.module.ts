import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { SharedModule } from '../shared/shared.module';
import { FavoritesRoutingModule } from './favorites-routing.module';



@NgModule({
  declarations: [
    FavoritesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
