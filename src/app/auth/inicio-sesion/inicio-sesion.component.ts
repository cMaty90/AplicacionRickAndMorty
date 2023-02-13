import { Component, OnDestroy} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { RespLogin, Usuario } from '../interfaces/usuarios.interface';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnDestroy {

  constructor(private usuarioServicio: UsuariosService,
              private router: Router) { }


  usuario:Usuario = {
    mail: '',
    password:''
  }

  enviarDatos() {
    console.log(this.usuario)

    this.usuarioServicio.entrar(this.usuario).subscribe({
      next: (respuesta:RespLogin) => {
        console.log(respuesta)
        this.validarResuladoRespuestaPost(respuesta.header.resultCode);

        if (respuesta.header.resultCode == 0) {
          localStorage.setItem('nombreUsuario', JSON.stringify(respuesta.data.user.name));
          this.limpiarFormulario();
          this.router.navigate(['personajes'])
        }
      },
      error: (errorRespuesta: HttpErrorResponse) => {
        this.validarResuladoRespuestaPost(errorRespuesta.error.header.resultCode);
        this.limpiarFormulario();
      }
    })
  }

  validarResuladoRespuestaPost(codigoRespuesta:number) {
    switch (codigoRespuesta) {
      case 0:
        alert('inicio de sesion exitoso');
        break;

      case 2:
        alert('falta escribir mail o contraseña');
        break;

      case 3:
        alert('no se encontro el usuario');
        break;

      case 4:
        alert('contraseña incorrecta');
        break;

      default:
        alert('nada')
        break;
    }
  }

  limpiarFormulario() {
    this.usuario = {
      mail: '',
      password:''
    }
  }


  ngOnDestroy(): void {
      localStorage.setItem('vectorFavorites', JSON.stringify([]));
  }
}
