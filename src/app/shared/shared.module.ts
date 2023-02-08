import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import {RouterModule} from '@angular/router';
import { BuscadorPathComponent } from './buscador-path/buscador-path.component';
import { UsuarioComponent } from './usuario/usuario.component'



@NgModule({
  declarations: [
    NavegacionComponent,
    BuscadorPathComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavegacionComponent,
    BuscadorPathComponent,
    UsuarioComponent
  ]
})
export class SharedModule { }
