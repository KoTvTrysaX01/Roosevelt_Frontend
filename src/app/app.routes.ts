import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MyRoutes } from './pages/my-routes/my-routes';
import { FavRoutes } from './pages/fav-routes/fav-routes';
import { Settings } from './pages/settings/settings';
import { Administrador } from './pages/administrador/administrador';
import { Map } from './pages/map/map';
import { Login } from './pages/login/login';
import { LogIn } from './components/log-in/log-in';
import { Register } from './components/register/register';
import { Restore } from './components/restore/restore';

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
  },
  {
    path: 'login',
    component: Login,
    children: [
      {
        path: 'log-in',
        component: LogIn,
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: Register
      },
      {
        path: 'restore',
        component: Restore
      }
    ]
  },
];
