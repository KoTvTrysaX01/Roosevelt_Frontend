import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { Home } from "./pages/home/home";
import { FavRoutes } from "./pages/fav-routes/fav-routes";
import { MyRoutes } from "./pages/my-routes/my-routes";
import { Map } from "./pages/map/map";
import { Settings } from "./pages/settings/settings";
import { Administrador } from "./pages/administrador/administrador";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer, Home, FavRoutes, MyRoutes, Map, Settings, Administrador],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('roosevelt_frontend');
}
