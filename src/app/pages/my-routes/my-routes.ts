import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-routes',
  imports: [],
  templateUrl: './my-routes.html',
  styleUrl: './my-routes.scss',
})
export class MyRoutes implements OnInit{
  authService = inject(AuthService)
  router = inject(Router)
  ngOnInit(): void {
    if(this.authService.currentUserSig() === null){
      this.router.navigateByUrl('/auth/login')
    }
  }

}
