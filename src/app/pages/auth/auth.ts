import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnInit{

  authService = inject(AuthService);
  ngOnInit(): void {

  }

  logout(): void{
    localStorage.setItem('user', '');
    this.authService.currentUserSig.set(null);
  }
}
