import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:FavoritesListComponent
      },
      {
        path: '**',
        component:FavoritesListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FavoritesRoutingModule { }
