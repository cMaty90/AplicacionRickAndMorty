import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NuevoUsuario, ResponseRegistro } from '../interfaces/usuarios.interface';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {


  constructor(private servicioUsuarios: UsuariosService) { }

  @ViewChild('repetirPassword') repetirPassword!: ElementRef;

  nuevoUsuario: NuevoUsuario = {
    name: '',
    mail: '',
    password:''
  }


  registrarse() {
    console.log(this.nuevoUsuario)

    let bandera = this.validarCampos(this.nuevoUsuario);
    if (bandera) {
      this.servicioUsuarios.registrarNuevoUsuario(this.nuevoUsuario).subscribe({
        next: (respuesta: ResponseRegistro) => {
          console.log(respuesta);
          this.validarRegistroUsuario(respuesta.header.resultCode);
          this.limpiarUsuarioNuevo();
          this.repetirPassword.nativeElement.value='';
        },
        error: (errorRespuesta: HttpErrorResponse) => {
          this.validarRegistroUsuario(errorRespuesta.error.header.resultCode);
          this.limpiarUsuarioNuevo();
          this.repetirPassword.nativeElement.value='';
        }
      })
    }

  }




  validarCampos(usuario: NuevoUsuario): boolean {
    let bandera: boolean = true;

    if (!(usuario.name.length > 5 && usuario.name.length < 15)) {
      bandera = false;
      alert('el nombre debe tener entre 5 y 15 caracteres');
    }

    if (!(usuario.mail.length > 10 && usuario.mail.length < 50)) {
      bandera = false;
      alert('el mail debe tener entre 10 y 50 caracteres');
    }

    if (!(usuario.password.length > 8 && usuario.password.length < 30)) {
      bandera = false;
      alert('la contraseña debe tener entre 8 y 30 caracteres');
    }

    if (this.repetirPassword.nativeElement.value != usuario.password) {
      bandera = false;
      alert('las contraseñas no coinciden');
    }

    return bandera
  }

  validarRegistroUsuario(codigoRespuesta:number) {
    switch (codigoRespuesta) {
      case 0:
        alert('se ha registrado exitosamente');
        break;

      case 1:
        alert('el mail ya fue registrado');
        break;

      case 2:
        alert('falta completar campos');
        break;

      default:
        alert('nada')
        break;
    }
  }

  limpiarUsuarioNuevo() {
    this.nuevoUsuario = {
      name: '',
      mail: '',
      password:''
    }
  }


}
