import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEpisodesComponent } from './list-episodes/list-episodes.component';
import { SpecificEpisodeComponent } from './specific-episode/specific-episode.component';
import { SharedModule } from '../shared/shared.module';
import { EpisodesRoutingModule } from './episodes-routing.module';
import { SearchedEpisodeComponent } from './searched-episode/searched-episode.component';



@NgModule({
  declarations: [
    ListEpisodesComponent,
    SpecificEpisodeComponent,
    SearchedEpisodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EpisodesRoutingModule
  ]
})
export class EpisodesModule { }
