import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
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
    this.router.navigateByUrl('/')
  }

  changeTab(btnActive: string): void{
    this.active = btnActive;
  }
}
