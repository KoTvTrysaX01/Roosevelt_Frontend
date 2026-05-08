import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("") 
  });

  http = inject(HttpClient);
  router = inject(Router)
  onLogin(){
    const formValue = this.loginForm.value;
    this.http.post("http://localhost:8080/roosevelt/api/auth/login", formValue).subscribe({
      next:(response:any) => {
        if(response.message != "Bad credentials"){
          alert("Login success");
          this.router.navigateByUrl("/");
        }else{
          alert(response.message)
        }
      },
      error:(error) => {
        alert(error.message)
      }
    })
  }

}
