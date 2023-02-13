import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from '../interfaces/personajes.interface';
import { PersonajesService } from '../services/personajes.service';

@Component({
  selector: 'app-searched-character',
  templateUrl: './searched-character.component.html',
  styleUrls: ['./searched-character.component.css']
})


export class SearchedCharacterComponent implements OnInit{

  constructor(private serviceCharacter: PersonajesService,
              private router:Router) { }

  searchedCharacter: string = JSON.parse(localStorage.getItem('specificCharacterNameSearched')!);

  vectorSearchedCharacters: Result[] = [];
  contador: number = 1;
  linkSearchedCharacter: string = `https://rickandmortyapi.com/api/character?name=${this.searchedCharacter}`;
  numberOfPages: number = 0;
  path: string = '';

  getNumberOfPages() {
      this.serviceCharacter.conseguirPersonajes(this.linkSearchedCharacter)
      .subscribe(resp => {
        this.numberOfPages = resp.info.pages;
        console.log(this.numberOfPages)
      })
  }

  ngOnInit(): void {
    this.getNumberOfPages();
    console.log(this.linkSearchedCharacter);
    this.showFirstPage();
  }

  showFirstPage() {
    this.serviceCharacter.conseguirPersonajes(this.linkSearchedCharacter)
      .subscribe(resp => {
        console.log(resp);
        this.vectorSearchedCharacters = resp.results;

        this.path=`Home / Personajes / Personaje Buscado / ${this.searchedCharacter}`
      })
  }

  changeNextPage() {
    if (this.contador<this.numberOfPages) {
      this.contador++
      let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/character?name=${this.searchedCharacter}&page=${this.contador}`;
      console.log(this.contador)
      this.serviceCharacter.conseguirPersonajes(apiUrlSiguiente)
      .subscribe(resp => {
        this.vectorSearchedCharacters = resp.results;
      })
    }
    else {
      alert('ya no hay mas paginas siguientes');
    }
  }

  changePreviousPage() {
    if (this.contador>0) {
      this.contador--
      let apiUrlAnterior: string = `https://rickandmortyapi.com/api/character?name=${this.searchedCharacter}&page=${this.contador}`;
      console.log(this.contador);
      this.serviceCharacter.conseguirPersonajes(apiUrlAnterior)
      .subscribe(resp => {
        this.vectorSearchedCharacters = resp.results;
      })
    }
    else {
      alert('ya no hay mas paginas anteriores');
    }
  }

  mostrarPersonajeEspecifico(character: Result) {
    console.log(character);
    let idPersonaje = character.id;
    let linkPerosnajeEspecifico = `https://rickandmortyapi.com/api/character/${idPersonaje}`;
    localStorage.setItem('linkPersonajeEspecifico', JSON.stringify(linkPerosnajeEspecifico));
    this.router.navigate([`personajes/${idPersonaje}`])
  }
}
