import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  active: string = "login";

  ngOnInit(): void {
  
  }

  logout(): void {
    localStorage.setItem('user', '');
    this.authService.currentUserSig.set(null);
  }

  changeTab(btnActive: string): void{
    this.active = btnActive;
    console.log(this.active);
    
  }
}
