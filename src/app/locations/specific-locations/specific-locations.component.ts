import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NameIdResident, SpecificLocation } from '../interfaces/specific-location.interface';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-specific-locations',
  templateUrl: './specific-locations.component.html',
  styleUrls: ['./specific-locations.component.css']
})


export class SpecificLocationsComponent implements OnInit{

  ngOnInit(): void {
    this.showDataSpecificLocation();
    this.showListResidents();
  }

  constructor(private serviceLocation: LocationsService,
    private router: Router) { }

  vectorLinksLocations: string[] = [];
  vectorResidentsInLocation: NameIdResident[] = [];

  linkSpecificLocation: string = JSON.parse(localStorage.getItem('linkSpecificLocation')!);

  nameLocation: string = '';
  typeLocation: string = '';
  dimension: string = '';
  path: string = '';


  showDataSpecificLocation() {
    this.serviceLocation.getDataSpecificLocation(this.linkSpecificLocation)
      .subscribe(resp => {
        this.nameLocation = resp.name;
        this.typeLocation = resp.type;
        this.dimension = resp.dimension;

        this.vectorLinksLocations = resp.residents;

        this.path = `Home / Ubicaciones / Ubicacion Especifica / ${resp.name}`;
      })
  }

  showListResidents() {
    setTimeout(() => {
      for (let i = 0; i < this.vectorLinksLocations.length; i++) {
      this.serviceLocation.getDataResidentsInLocation(this.vectorLinksLocations[i])
        .subscribe(resp => {
          this.vectorResidentsInLocation.push({ id: resp.id, name: resp.name });
        })
      }
    }, 500);
  }

  showSpecificResident(idResident:number) {
    let linkSpecificResident = `https://rickandmortyapi.com/api/character/${idResident}`;
    localStorage.setItem('linkPersonajeEspecifico', JSON.stringify(linkSpecificResident));
    this.router.navigate([`personajes/${idResident}`]);
  }




}
