import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/personajes/interfaces/personajes.interface';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {
    this.showFavoriteCharacters();
  }

  vectorFavorites: Result[] = [];

  showFavoriteCharacters() {
    this.vectorFavorites = JSON.parse(localStorage.getItem('vectorFavorites')!);
  }

  mostrarPersonajeEspecifico(personaje: Result) {
    console.log(personaje);
    let idPersonaje = personaje.id;
    let linkPerosnajeEspecifico = `https://rickandmortyapi.com/api/character/${idPersonaje}`;
    localStorage.setItem('linkPersonajeEspecifico', JSON.stringify(linkPerosnajeEspecifico));
    this.router.navigate([`personajes/${idPersonaje}`])
  }

}
