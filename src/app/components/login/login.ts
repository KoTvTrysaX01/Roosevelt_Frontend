import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { UserInterface } from '../../interfaces/user-interface';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  ngOnInit(): void {}
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onLogin(): void {
    this.http
      .post<UserInterface>(`${environment.API_ROOSEVELT}/auth/login`, { username: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value,})
      .subscribe({
        next: (result) => {
          localStorage.setItem('user', result.user || '');
          localStorage.setItem('roles', result.roles || '')
          this.authService.currentUserSig.set(result);
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          alert(`Error al iniciar session ${error.message}`);
        },
      });
  }
}
