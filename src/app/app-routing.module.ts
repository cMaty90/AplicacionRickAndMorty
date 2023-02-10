import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListadoPersonajesComponent } from './personajes/listado-personajes/listado-personajes.component';
import { InicioSesionComponent } from './auth/inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './auth/registro-usuario/registro-usuario.component';
import { ErrorDireccionComponent } from './error-direccion/error-direccion.component';


const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'personajes',
    loadChildren: () => import('./personajes/personajes.module').then(m => m.PersonajesModule)
  },
  {
    path: 'episodios',
    loadChildren: () => import('./episodes/episodes.module').then(m => m.EpisodesModule)
  },
  {
    path: 'ubicaciones',
    loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: '**',
    component:ErrorDireccionComponent
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
