import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
