import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '../interfaces/personajes.interface';
import { PersonajesService } from '../services/personajes.service';

@Component({
  selector: 'app-personaje-especifico',
  templateUrl: './personaje-especifico.component.html',
  styleUrls: ['./personaje-especifico.component.css']
})

export class PersonajeEspecificoComponent implements OnInit{

  name: string = '';
  status: string = '';
  specie: string = '';
  gender: string = '';
  origin: Location = {
    name: '',
    url:''
  };

  location: Location = {
    name: '',
    url:''
  };

  imageCharacter: string = '';
  vectorEpisodes: string[] = []; //links episodes
  vectorEpisodeNames: string[] = []; //name episodes

  ngOnInit(): void {
    this.showCardData();
    this.showListEpisodesData();
  }

  constructor(private servicioPersonajes:PersonajesService){}
  characterSpecificLink: string = JSON.parse(localStorage.getItem('linkPersonajeEspecifico')!);

  showCardData() {
    this.servicioPersonajes.obtenerDatosPersonajeEspecifico(this.characterSpecificLink)
      .subscribe(resp => {
        this.imageCharacter = resp.image;
        this.name = resp.name;
        this.status = resp.status;
        this.specie = resp.species;
        this.gender = resp.gender;
        this.origin.name = resp.origin.name;
        this.location.name = resp.location.name;

        this.origin.url = resp.origin.url;
        this.location.url = resp.location.url;

        this.vectorEpisodes = resp.episode;
        console.log(resp)
      })
  }

  showListEpisodesData() {
    setTimeout(() => {
      for (let i = 0; i < this.vectorEpisodes.length; i++) {
      this.servicioPersonajes.getDataCharacterEpisodes(this.vectorEpisodes[i])
        .subscribe(resp => {
          this.vectorEpisodeNames.push(resp.name);
        })
      }
    }, 1050);
  }

  mostrarLinkEpisodio(episodes:string) {
    let linkEpisode = `https://rickandmortyapi.com/api/episode?name=${episodes}`;
    console.log(linkEpisode);
  }

}
