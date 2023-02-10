import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsResponse } from '../interfaces/locations.interface';
import { ResidentInLocation, SpecificLocation } from '../interfaces/specific-location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }


  getLocations(url: string): Observable<LocationsResponse>{
    return this.http.get<LocationsResponse>(url)
  }

  getDataSpecificLocation(url: string): Observable<SpecificLocation>{
    return this.http.get<SpecificLocation>(url)
  }

  getDataResidentsInLocation(url:string): Observable<ResidentInLocation> {
    return this.http.get<ResidentInLocation>(url)
  }
}
