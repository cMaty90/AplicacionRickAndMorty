import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode, EpisodesResponse } from '../interfaces/episodes.interface';
import { EpisodeCharacters, SpecificEpisodesResponse } from '../interfaces/specific-episode.interface';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { }

  private apiUrlEpisodes: string = 'https://rickandmortyapi.com/api/episode';

  getEpisodes(url:string): Observable<EpisodesResponse> {
    return this.http.get<EpisodesResponse>(url)
  }

  getDataSpecificEpisode(url: string):Observable<SpecificEpisodesResponse> {
    return this.http.get<SpecificEpisodesResponse>(url)
  }

  getDataEpisodeCharacter(url:string): Observable<EpisodeCharacters> {
    return this.http.get<EpisodeCharacters>(url)
  }

}
