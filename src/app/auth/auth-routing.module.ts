import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:InicioSesionComponent
      },
      {
        path: 'registro',
        component:RegistroUsuarioComponent
      },
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
export class AuthRoutingModule { }
