import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MyRoutes } from './pages/my-routes/my-routes';
import { FavRoutes } from './pages/fav-routes/fav-routes';
import { Settings } from './pages/settings/settings';
import { Administrador } from './pages/administrador/administrador';
import { Map } from './pages/map/map';
import { Auth } from './pages/auth/auth';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Solicitudes } from './components/tables/solicitudes/solicitudes';
import { Mensajes } from './components/tables/mensajes/mensajes';
import { Estadisticas } from './components/tables/estadisticas/estadisticas';
import { Usuarios } from './components/tables/usuarios/usuarios';
import { Ajustes } from './components/tables/ajustes/ajustes';
import { Zonas } from './components/tables/zonas/zonas';
import { Rutas } from './components/tables/rutas/rutas';
import { Comentarios } from './components/tables/comentarios/comentarios';
import { Objetos } from './components/tables/objetos/objetos';
import { Tipos } from './components/tables/tipos/tipos';
import { Recover } from './components/recover/recover';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'map',
    component: Map,
  },
  {
    path: 'my_routes',
    component: MyRoutes,
  },
  {
    path: 'fav_routes',
    component: FavRoutes,
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: 'admin',
    component: Administrador,
    children: [
      //----------------------------------- Tables -----------------------------------
      {
        path: 'solicitudes',
        component: Solicitudes,
        pathMatch: 'full',
      },
      {
        path: 'mensajes',
        component: Mensajes,
      },
      {
        path: 'estadisticas',
        component: Estadisticas,
      },
      {
        path: 'usuarios',
        component: Usuarios,
      },
      {
        path: 'ajustes',
        component: Ajustes,
      },
      {
        path: 'zonas',
        component: Zonas,
      },
      {
        path: 'rutas',
        component: Rutas,
      },
      {
        path: 'comentarios',
        component: Comentarios,
      },
      {
        path: 'objetos',
        component: Objetos,
      },
      {
        path: 'tiposobjeto',
        component: Tipos,
      },
      //----------------------------------- Specific Register -----------------------------------
      {
        path: 'solicitudes/:id',
        component: Solicitudes,
        pathMatch: 'full',
      },
      {
        path: 'mensajes/:id',
        component: Mensajes,
      },
      {
        path: 'usuarios/:id',
        component: Usuarios,
      },
      {
        path: 'ajustes/:id',
        component: Ajustes,
      },
      {
        path: 'zonas/:id',
        component: Zonas,
      },
      {
        path: 'rutas/:id',
        component: Rutas,
      },
      {
        path: 'comentarios/:id',
        component: Comentarios,
      },
      {
        path: 'objetos/:id',
        component: Objetos,
      },
      {
        path: 'tiposobjeto/:id',
        component: Tipos,
      },
    ],
  },
  {
    path: 'auth',
    component: Auth,
    children: [
      {
        path: 'login',
        component: Login,
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'recover',
        component: Recover,
      },
    ],
  },
];
