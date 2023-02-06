import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPersonajesComponent } from './listado-personajes/listado-personajes.component';
import { PersonajeEspecificoComponent } from './personaje-especifico/personaje-especifico.component';
import { PersonajesRoutingModule } from './personajes-routing.module';



@NgModule({
  declarations: [
    ListadoPersonajesComponent,
    PersonajeEspecificoComponent
  ],
  imports: [
    CommonModule,
    PersonajesRoutingModule
  ]
})
export class PersonajesModule { }
