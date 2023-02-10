import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Result } from '../interfaces/personajes.interface';
import { PersonajesService } from '../services/personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-personajes',
  templateUrl: './listado-personajes.component.html',
  styleUrls: ['./listado-personajes.component.css']
})

export class ListadoPersonajesComponent implements OnInit{

  constructor(private servicioPersonajes: PersonajesService,
    private router: Router) { };

  @ViewChild('characterSearched') characterSearched!: ElementRef;

  arrayPersonajes: Result[] = [];
  vectorFavorites: Result[] = [];
  contador: number = 1;
  apiUrl: string = `https://rickandmortyapi.com/api/character?page=${this.contador}`;

  ngOnInit(): void {
    this.mostrarConTipado();
  }

  mostrarConTipado() {
    this.servicioPersonajes.conseguirPersonajes(this.apiUrl)
      .subscribe(resp => {
        console.log(resp)
        this.arrayPersonajes = resp.results;
      })
  }

  cambiarPaginaSiguiente() {
    this.contador++
    let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/character?page=${this.contador}`;
    console.log(this.contador)
    this.servicioPersonajes.conseguirPersonajes(apiUrlSiguiente)
      .subscribe(resp => {
        this.arrayPersonajes = resp.results;
      })
  }

  cambiarPaginaAnterior() {
    if (this.contador>0) {
      this.contador--
      let apiUrlAnterior: string = `https://rickandmortyapi.com/api/character?page=${this.contador}`;
      console.log(this.contador)
      this.servicioPersonajes.conseguirPersonajes(apiUrlAnterior)
        .subscribe(resp => {
          this.arrayPersonajes = resp.results;
        })
    }
    else {
      alert('no hay mas paginas anteriores');
    }
  }

  mostrarPersonajeEspecifico(personaje: Result) {
    console.log(personaje);
    let idPersonaje = personaje.id;
    let linkPerosnajeEspecifico = `https://rickandmortyapi.com/api/character/${idPersonaje}`;
    localStorage.setItem('linkPersonajeEspecifico', JSON.stringify(linkPerosnajeEspecifico));
    this.router.navigate([`personajes/${idPersonaje}`])
  }

  saveCharacterName() {
    let characterName = this.characterSearched.nativeElement.value;
    localStorage.setItem('specificCharacterNameSearched', JSON.stringify(characterName));
    this.router.navigate([`personajes/personaje-buscado/${characterName}`]);
  }

  saveFavoriteCharacter(personaje:Result) {
    this.vectorFavorites.push(personaje);
    localStorage.setItem('vectorFavorites', JSON.stringify(this.vectorFavorites));
  }
}
