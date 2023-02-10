import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../interfaces/locations.interface';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit{

  ngOnInit(): void {
    this.getNumberOfPages();
    this.showFirstPage();
  }

  constructor(private locationService: LocationsService,
    private router: Router) { }

  @ViewChild('searchedLocation') searchedLocation!: ElementRef;

  contador: number = 1;
  numberOfPages: number = 0;
  arrayLocations: Location[] = [];
  linkLocations: string = `https://rickandmortyapi.com/api/location?page=${this.contador}`;

  getNumberOfPages() {
      this.locationService.getLocations(this.linkLocations)
      .subscribe(resp => {
        this.numberOfPages = resp.info.pages;
        console.log(this.numberOfPages)
      })
  }

  showFirstPage() {
    this.locationService.getLocations(this.linkLocations)
      .subscribe(resp => {
        this.arrayLocations = resp.results;
      })
  }

  changeNextPage() {
    if (this.contador<this.numberOfPages) {
      this.contador++
      let apiUrlSiguiente: string = `https://rickandmortyapi.com/api/location?page=${this.contador}`;
      console.log(this.contador)
      this.locationService.getLocations(apiUrlSiguiente)
      .subscribe(resp => {
        this.arrayLocations = resp.results;
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
      this.locationService.getLocations(apiUrlAnterior)
      .subscribe(resp => {
        this.arrayLocations = resp.results;
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

  saveSearchedLocation() {
    let locationName = this.searchedLocation.nativeElement.value;
    localStorage.setItem('specificLocationNameSearched', JSON.stringify(locationName));
    this.router.navigate([`ubicaciones/ubicacion-buscada/${locationName}`]);
  }



}
