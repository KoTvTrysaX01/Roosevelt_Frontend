import { Component, inject, OnInit } from '@angular/core';
import { SideMenu } from "../../components/side-menu/side-menu";
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-administrador',
  imports: [SideMenu, RouterOutlet],
  templateUrl: './administrador.html',
  styleUrl: './administrador.scss',
})
export class Administrador implements OnInit{

  router = inject(Router)
  authService = inject(AuthService)
  ngOnInit(): void {
    if(this.authService.currentUserSig()?.roles !== '[ROLE_ADMIN]'){
      this.router.navigateByUrl('/')
    }
  }

  

}
