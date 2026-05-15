import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  http = inject(HttpClient);
  authService = inject(AuthService);
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') {
      this.authService.currentUserSig.set({
        message: '',
        user: localStorage.getItem('user'),
        roles: localStorage.getItem('roles'),
      });
    }
console.log(this.authService.currentUserSig());

  }
  protected readonly title = signal('roosevelt_frontend');
}
