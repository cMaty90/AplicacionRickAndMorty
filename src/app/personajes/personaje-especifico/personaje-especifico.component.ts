import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NameIdEpisode } from '../interfaces/personaje-especifico.interface';
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
  vectorEpisodeNames: NameIdEpisode[] = []; //name and id episodes
  path: string = '';

  ngOnInit(): void {
    this.showCardData();
    this.showListEpisodesData();
  }

  constructor(private servicioPersonajes: PersonajesService,
    private router: Router) { }

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

        this.path=`Home / Personajes / Personaje Especifico / ${resp.name}`
      })
  }

  showListEpisodesData() {
    setTimeout(() => {
      for (let i = 0; i < this.vectorEpisodes.length; i++) {
      this.servicioPersonajes.getDataCharacterEpisodes(this.vectorEpisodes[i])
        .subscribe(resp => {
          this.vectorEpisodeNames.push({id:resp.id, name:resp.name});
        })
      }
    }, 1050);
  }

  showSpecificEpisode(idEpisode:number) {
    console.log(idEpisode);
    let linkSpecificEpisode = `https://rickandmortyapi.com/api/episode/${idEpisode}`;
    localStorage.setItem('linkSpecificEpisode', JSON.stringify(linkSpecificEpisode));
    this.router.navigate([`episodios/${idEpisode}`])
  }

  showSpecificOrigin() {
    this.servicioPersonajes.obtenerDatosPersonajeEspecifico(this.characterSpecificLink)
      .subscribe(resp => {
        let idOrigin = resp.origin.url.slice(-1);
        let linkSpecificLocation = `https://rickandmortyapi.com/api/location/${idOrigin}`;
        localStorage.setItem('linkSpecificLocation', JSON.stringify(linkSpecificLocation));
        this.router.navigate(([`ubicaciones/${idOrigin}`]))
      })
  }

  showSpecificLocation() {
    this.servicioPersonajes.obtenerDatosPersonajeEspecifico(this.characterSpecificLink)
      .subscribe(resp => {
        let idLocation = resp.location.url.slice(-1);
        let linkSpecificLocation = `https://rickandmortyapi.com/api/location/${idLocation}`;
        localStorage.setItem('linkSpecificLocation', JSON.stringify(linkSpecificLocation));
        this.router.navigate(([`ubicaciones/${idLocation}`]))
      })
  }


}
