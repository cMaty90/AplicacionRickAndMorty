import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonajesRespuesta, Result } from '../interfaces/personajes.interface';
import { PersonajeEspecifico, CharacterEpisodes } from '../interfaces/personaje-especifico.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'https://rickandmortyapi.com/api/character';

  vectorPersonajes: Result[] = [];

  conseguirPersonajes(url:string): Observable<PersonajesRespuesta>{
    return this.http.get<PersonajesRespuesta>(url)
  }

  obtenerDatosPersonajeEspecifico(url: string): Observable<PersonajeEspecifico> {
    return this.http.get<PersonajeEspecifico>(url)
  }

  getDataCharacterEpisodes(url:string): Observable<CharacterEpisodes>{ //traer episodios del perosnaje
    return this.http.get<CharacterEpisodes>(url)
  }

}
