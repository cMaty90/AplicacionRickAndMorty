import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Episode } from '../interfaces/episodes.interface';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-list-episodes',
  templateUrl: './list-episodes.component.html',
  styleUrls: ['./list-episodes.component.css']
})
export class ListEpisodesComponent implements OnInit{

  ngOnInit(): void {
    this.getNumberOfPages();
    this.showFirstPage();
  }

  constructor(private episodesService: EpisodesService,
    private router: Router) { }

  @ViewChild('searchedEpisode') searchedEpisode!: ElementRef;

  arrayEpisodes: Episode[] = [];
  contador: number = 1;
  urlEpisodes: string = `https://rickandmortyapi.com/api/episode?page=${this.contador}`;
  numberOfPages: number = 0;
  path: string = '';

  getNumberOfPages() {
      this.episodesService.getEpisodes(this.urlEpisodes)
      .subscribe(resp => {
        this.numberOfPages = resp.info.pages;
        console.log(this.numberOfPages)
      })
  }

  showFirstPage() {
    this.episodesService.getEpisodes(this.urlEpisodes)
      .subscribe(resp => {
        this.arrayEpisodes = resp.results;
        this.router.navigate([`/episodios/pagina/${this.contador}`]);
        this.path = `Home / episodios / pagina / ${this.contador}`;
      })
  }

  changeNextPage() {
    if (this.contador<this.numberOfPages) {
      this.contador++
      let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/episode?page=${this.contador}`;
      console.log(this.contador)
      this.episodesService.getEpisodes(apiUrlSiguiente)
        .subscribe(resp => {
        console.log(resp)
          this.arrayEpisodes = resp.results;
          this.router.navigate([`/episodios/pagina/${this.contador}`]);
          this.path = `Home / episodios / pagina / ${this.contador}`;
      })
    }
    else {
      alert('ya no hay mas paginas siguientes');
    }
  }

  changePreviousPage() {
    if (this.contador>0) {
      this.contador--
      let apiUrlAnterior: string = `https://rickandmortyapi.com/api/episode?page=${this.contador}`;
      console.log(this.contador);
      this.episodesService.getEpisodes(apiUrlAnterior)
      .subscribe(resp => {
        this.arrayEpisodes = resp.results;
        this.router.navigate([`/episodios/pagina/${this.contador}`]);
        this.path = `Home / episodios / pagina / ${this.contador}`;
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


  saveSearchedEpisode() {
    let episodeName = this.searchedEpisode.nativeElement.value;
    localStorage.setItem('specificEpisodeNameSearched', JSON.stringify(episodeName));
    this.router.navigate([`episodios/episodio-buscado/${episodeName}`]);
  }

  redirecToPageOne() {
    this.router.navigate([`/episodios`])
  }

}
