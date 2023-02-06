import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPersonajesComponent } from './listado-personajes/listado-personajes.component';
import { PersonajeEspecificoComponent } from './personaje-especifico/personaje-especifico.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:ListadoPersonajesComponent
      },
      {
        path: ':id',
        component:PersonajeEspecificoComponent
      },
      {
        path: '**',
        component:ListadoPersonajesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PersonajesRoutingModule { }
