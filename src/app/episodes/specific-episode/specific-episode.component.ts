import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeCharacters, NameIdCharacter } from '../interfaces/specific-episode.interface';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-specific-episode',
  templateUrl: './specific-episode.component.html',
  styleUrls: ['./specific-episode.component.css']
})
export class SpecificEpisodeComponent implements OnInit {

  ngOnInit(): void {
    this.showDataSpecificEpisode();
    this.showListCharacters();
  }

  constructor(private episodeService: EpisodesService,
  private router:Router) { }

  vectorCharacters: string[] = []; //guardo links a a los personajes
  vectorCharacterNames: NameIdCharacter[] = [];

  linkSpecificEpisode: string = JSON.parse(localStorage.getItem('linkSpecificEpisode')!);
  nameEpisode: string = '';
  airDateEpisode: string = '';
  episodeCode: string = '';
  path: string = '';


  showDataSpecificEpisode() {
    this.episodeService.getDataSpecificEpisode(this.linkSpecificEpisode)
      .subscribe(resp => {
        this.nameEpisode = resp.name;
        this.airDateEpisode = resp.air_date;
        this.episodeCode = resp.episode;

        this.vectorCharacters = resp.characters;

        this.path = `Home / Episodios / Episodio Especifico / ${resp.name}`;
      })
  }

  showListCharacters() {
    setTimeout(() => {
      for (let i = 0; i < this.vectorCharacters.length; i++) {
        this.episodeService.getDataEpisodeCharacter(this.vectorCharacters[i])
          .subscribe(resp => {
            this.vectorCharacterNames.push({id:resp.id,name:resp.name})
          })
      }
    }, 1050);
    console.log(this.vectorCharacterNames)
  }

  showSpecificCharacter(characterId: number) {
    console.log(characterId);
    let character = characterId;
    let linkPerosnajeEspecifico = `https://rickandmortyapi.com/api/character/${character}`;
    localStorage.setItem('linkPersonajeEspecifico', JSON.stringify(linkPerosnajeEspecifico));
    this.router.navigate([`personajes/${character}`])
  }



}
