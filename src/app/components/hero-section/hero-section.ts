import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  authService = inject(AuthService);


  
}
