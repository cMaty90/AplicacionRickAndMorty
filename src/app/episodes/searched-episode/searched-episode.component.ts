import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Episode } from '../interfaces/episodes.interface';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-searched-episode',
  templateUrl: './searched-episode.component.html',
  styleUrls: ['./searched-episode.component.css']
})

export class SearchedEpisodeComponent implements OnInit {

  ngOnInit(): void {
    this.getNumberOfPages();
    this.showFirstPage();
  }
  constructor(private episodeService: EpisodesService,
    private router: Router) { }


  contador: number = 1;
  numberOfPages: number = 0;
  arrayEpisodes: Episode[] = [];
  searchedEpisode: string = JSON.parse(localStorage.getItem('specificEpisodeNameSearched')!);
  linkSearchedEpisode = `https://rickandmortyapi.com/api/episode?episode=${this.searchedEpisode}`;

  getNumberOfPages() {
      this.episodeService.getEpisodes(this.linkSearchedEpisode)
      .subscribe(resp => {
        this.numberOfPages = resp.info.pages;
        console.log(this.numberOfPages)
      })
  }

  showFirstPage() {
    this.episodeService.getEpisodes(this.linkSearchedEpisode)
      .subscribe(resp => {
        this.arrayEpisodes = resp.results;
      })
  }

  changeNextPage() {
    if (this.contador<this.numberOfPages) {
      this.contador++
      let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/episode?episode=${this.searchedEpisode}&page=${this.contador}`;
      console.log(this.contador)
      this.episodeService.getEpisodes(apiUrlSiguiente)
        .subscribe(resp => {
        console.log(resp)
        this.arrayEpisodes = resp.results;
      })
    }
    else {
      alert('ya no hay mas paginas siguientes');
    }
  }

  changePreviousPage() {
    if (this.contador>0) {
      this.contador--
      let apiUrlAnterior: string = `https://rickandmortyapi.com/api/episode?episode=${this.searchedEpisode}&page=${this.contador}`;
      console.log(this.contador);
      this.episodeService.getEpisodes(apiUrlAnterior)
      .subscribe(resp => {
        this.arrayEpisodes = resp.results;
      })
    }
    else {
      alert('ya no hay mas paginas anteriores');
    }
  }

  showSpecificEpisode(episode: Episode) {
    console.log(episode);
    let idEpisode = episode.id;
    let linkSpecificEpisode = `https://rickandmortyapi.com/api/episode/${idEpisode}`;
    localStorage.setItem('linkSpecificEpisode', JSON.stringify(linkSpecificEpisode));
    this.router.navigate([`episodios/${idEpisode}`])
  }

}
