import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPersonajesComponent } from './listado-personajes/listado-personajes.component';
import { PersonajeEspecificoComponent } from './personaje-especifico/personaje-especifico.component';
import { PersonajesRoutingModule } from './personajes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchedCharacterComponent } from './searched-character/searched-character.component';



@NgModule({
  declarations: [
    ListadoPersonajesComponent,
    PersonajeEspecificoComponent,
    SearchedCharacterComponent
  ],
  imports: [
    CommonModule,
    PersonajesRoutingModule,
    SharedModule
  ]
})
export class PersonajesModule { }
