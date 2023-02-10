import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../interfaces/locations.interface';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-searched-locations',
  templateUrl: './searched-locations.component.html',
  styleUrls: ['./searched-locations.component.css']
})


export class SearchedLocationsComponent implements OnInit{

  ngOnInit(): void {
    this.getNumberOfPages();
    this.showFirstPage();
  }


  constructor(private serviceLocation: LocationsService,
    private router: Router) { }


  locationName: string = JSON.parse(localStorage.getItem('specificLocationNameSearched')!);
  contador: number = 1;
  numberOfPages: number = 0;
  linkSearchedLocation: string = `https://rickandmortyapi.com/api/location?name=${this.locationName}&page=${this.contador}`;

  vectorLocations: Location[] = [];

  getNumberOfPages() {
      this.serviceLocation.getLocations(this.linkSearchedLocation)
      .subscribe(resp => {
        this.numberOfPages = resp.info.pages;
        console.log(this.numberOfPages)
      })
  }

  showFirstPage() {
    this.serviceLocation.getLocations(this.linkSearchedLocation)
      .subscribe(resp => {
        this.vectorLocations = resp.results;
      })
  }

  changeNextPage() {
    if (this.contador<this.numberOfPages) {
      this.contador++
      let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/location?page=${this.contador}`;
      console.log(this.contador)
      this.serviceLocation.getLocations(apiUrlSiguiente)
      .subscribe(resp => {
        this.vectorLocations = resp.results;
      })
    }
    else {
      alert('ya no hay mas paginas siguientes');
    }
  }

  changePreviousPage() {
    if (this.contador>0) {
      this.contador--
      let apiUrlAnterior: string = `https://rickandmortyapi.com/api/location?page=${this.contador}`;
      console.log(this.contador);
      this.serviceLocation.getLocations(apiUrlAnterior)
      .subscribe(resp => {
        this.vectorLocations = resp.results;
      })
    }
    else {
      alert('ya no hay mas paginas anteriores');
    }
  }

  showSpecificLocation(idLocation: number) {
    console.log(idLocation);
    let linkSpecificLocation = `https://rickandmortyapi.com/api/location/${idLocation}`;
    localStorage.setItem('linkSpecificLocation', JSON.stringify(linkSpecificLocation));
    this.router.navigate(([`ubicaciones/${idLocation}`]))
  }






}
