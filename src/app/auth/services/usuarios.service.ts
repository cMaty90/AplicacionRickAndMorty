import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NuevoUsuario, RespLogin, ResponseRegistro, Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  urlPost: string = 'https://api-auth-moby.herokuapp.com/api/user/login';

  urlRegistro: string = 'https://api-auth-moby.herokuapp.com/api/user/register';

  entrar(usuario:Usuario): Observable<RespLogin>{
    return this.http.post<RespLogin>(this.urlPost, usuario)
  }

  registrarNuevoUsuario(nuevoUsuario:NuevoUsuario): Observable<ResponseRegistro> {
    return this.http.post<ResponseRegistro>(this.urlRegistro, nuevoUsuario)
  }
}
