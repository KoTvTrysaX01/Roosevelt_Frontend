import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
  ngOnInit(): void {}

  registerForm = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    email_sec: new FormControl('', [Validators.email]),
    fechaNac: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    administrador: new FormControl({ value: false, disabled: false }),
  });

  onRegister(): void {
    const user = {
      id: null,
      nombre: this.registerForm.controls['nombre'].value,
      apellido: this.registerForm.controls['apellido'].value,
      username: this.registerForm.controls['username'].value,
      email: this.registerForm.controls['email'].value,
      email_sec: this.registerForm.controls['email_sec'].value,
      password: this.registerForm.controls['password'].value,
      administrador: false,
      tel: this.registerForm.controls['tel'].value,
      fechaNac: this.registerForm.controls['fechaNac'].value,
    };
    this.http.post(`${environment.API_ROOSEVELT}/usuarios`, user).subscribe({
      next: (result) => {
        alert(`Éxtio`);
        this.router.navigateByUrl('/auth/login');
      },
      error: (error) => {
        alert(`Error al registrar ${error.message}`)
      }
    });
  }
}
