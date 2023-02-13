import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  constructor(private router: Router) { }

  logOut() {
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['']);
  }
}
