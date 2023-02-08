import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEpisodesComponent } from './list-episodes/list-episodes.component';
import { SpecificEpisodeComponent } from './specific-episode/specific-episode.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:ListEpisodesComponent
      },
      {
        path: ':id',
        component:SpecificEpisodeComponent
      },
      {
        path: '**',
        component:ListEpisodesComponent
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
export class EpisodesRoutingModule { }
