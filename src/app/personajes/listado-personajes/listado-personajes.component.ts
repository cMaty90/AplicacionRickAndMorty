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
  vectorLS = JSON.parse(localStorage.getItem('vectorFavorites')!);

  contador: number = 1;
  apiUrl: string = `https://rickandmortyapi.com/api/character?page=${this.contador}`;
  path: string = '';

  ngOnInit(): void {
    this.mostrarConTipado();

    if (JSON.parse(localStorage.getItem('vectorFavorites')!) == null) {
      localStorage.setItem('vectorFavorites', JSON.stringify([]));
    }
    else {
      if (this.vectorLS.length>0) {
        this.vectorFavorites = this.vectorLS;
      }
    }
  }

  mostrarConTipado() {
    this.servicioPersonajes.conseguirPersonajes(this.apiUrl)
      .subscribe(resp => {
        console.log(resp)
        this.arrayPersonajes = resp.results;
        this.router.navigate([`/personajes/pagina/${this.contador}`]);
        this.path = `Home / personajes / pagina / ${this.contador}`;
      })
  }

  cambiarPaginaSiguiente() {
    this.contador++
    let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/character?page=${this.contador}`;
    console.log(this.contador)
    this.servicioPersonajes.conseguirPersonajes(apiUrlSiguiente)
      .subscribe(resp => {
        this.arrayPersonajes = resp.results;
        this.router.navigate([`/personajes/pagina/${this.contador}`]);
        this.path = `Home / personajes / pagina / ${this.contador}`;
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
          this.router.navigate([`/personajes/pagina/${this.contador}`]);
          this.path = `Home / personajes / pagina / ${this.contador}`;
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

  saveFavoriteCharacter(personaje: Result) {
    if (this.vectorLS.length >= 0) {
      this.vectorFavorites.push(personaje)
      console.log(this.vectorFavorites)
      this.vectorLS = this.vectorFavorites
      localStorage.setItem('vectorFavorites',JSON.stringify(this.vectorLS))
    }
  }

  redirecToPageOne() {
    this.router.navigate(['/personajes'])
  }
}
