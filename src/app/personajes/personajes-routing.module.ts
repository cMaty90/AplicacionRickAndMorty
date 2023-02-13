import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPersonajesComponent } from './listado-personajes/listado-personajes.component';
import { PersonajeEspecificoComponent } from './personaje-especifico/personaje-especifico.component';
import { SearchedCharacterComponent } from './searched-character/searched-character.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pagina/:id',
        component:ListadoPersonajesComponent
      },
      {
        path: ':id',
        component:PersonajeEspecificoComponent
      },
      {
        path: 'personaje-buscado/:name',
        component:SearchedCharacterComponent
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
