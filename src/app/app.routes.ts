import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MyRoutes } from './pages/my-routes/my-routes';
import { FavRoutes } from './pages/fav-routes/fav-routes';
import { Settings } from './pages/settings/settings';
import { Administrador } from './pages/administrador/administrador';
import { Map } from './pages/map/map';
import { Testapi } from './components/testapi/testapi';

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
    path: 'test',
    component: Testapi,
  },
];
