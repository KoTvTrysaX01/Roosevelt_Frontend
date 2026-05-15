import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-routes',
  imports: [],
  templateUrl: './fav-routes.html',
  styleUrl: './fav-routes.scss',
})
export class FavRoutes implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    if (this.authService.currentUserSig() === null) {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
