import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})

 // I am so sorry for what I've done here
export class Usuarios implements OnInit {

  router: any;
  dataGet: any = {
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    email_sec: '',
    password: '',
    administrador: false,
    tel: '',
    fechaNac: '',
  };

  dataPostPut: any = {
    id: null,
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    email_sec: '',
    password: '',
    administrador: false,
    tel: '',
    fechaNac: '',
  };

  idDelete: any = null;

  openFormModal(data: any | undefined) {
    const modelDiv = document.getElementById('formModal');
    const admin_checkbox = document.getElementById('admin_check') as HTMLInputElement;

    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }

    if (data != undefined) {
      this.dataGet = data;

      this.userForm.controls['nombre'].setValue(this.dataGet['nombre']);
      this.userForm.controls['apellido'].setValue(this.dataGet['apellido']);
      this.userForm.controls['username'].setValue(this.dataGet['username']);
      this.userForm.controls['fechaNac'].setValue(this.dataGet['fechaNac']);
      this.userForm.controls['email'].setValue(this.dataGet['email']);
      this.userForm.controls['email_sec'].setValue(this.dataGet['email_sec']);
      this.userForm.controls['tel'].setValue(this.dataGet['tel']);
      this.userForm.controls['administrador'].setValue(this.dataGet['administrador']);

      this.userForm?.controls?.['password'].removeValidators(Validators.required);
      document?.getElementById('password_field')?.removeAttribute('required');
      if (admin_checkbox != null) {
        admin_checkbox.checked = this.dataGet.administrador;
      }
    } else {
      this.dataGet = {
        id: null,
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        email_sec: '',
        password: '',
        administrador: false,
        tel: '',
        fechaNac: '',
      };
      this.userForm?.controls?.['password'].setValidators(Validators.required);
      admin_checkbox.checked = false;
      document?.getElementById('password_field')?.setAttribute('required', 'true');
    }
  }

  closeFormModal() {
    this.resetValidated();
    this.userForm.reset();
    const modelDiv = document.getElementById('formModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  openDeleteModal(id: any) {
    this.idDelete = id;
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeDeleteModal() {
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  doAlsoh() {
    console.log('algo');
  }

  userForm!: FormGroup;
  ngOnInit(): void {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      fechaNac: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_sec: new FormControl('', [Validators.email]),
      tel: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      administrador: new FormControl(''),
    });

    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = [
    'ID',
    'NOMBRE',
    'APELLIDO',
    'USERNAME',
    'CORREO',
    'CORREO SECUNDARIO',
    'TELÉFONO',
    'FECHA DE NACIMIENTO',
    'ADMINISTRADOR',
    'ACCIONES',
  ];
  dataArray: any[] = [];

  getApiData() {
    this.http.get(`${environment.API_ROOSEVELT}/usuarios`).subscribe({
      next: (result: any) => {
        this.dataArray = result;
      },
    });
  }

  postApi() {
    this.http.post(`${environment.API_ROOSEVELT}/usuarios`, this.dataPostPut).subscribe({
      next: (result) => {
        window.location.href = 'http://localhost:4200/admin/usuarios';
      },
    });
  }

  deleteApi() {
    this.http.delete(`${environment.API_ROOSEVELT}/usuarios/${this.idDelete}`).subscribe({
      next: (result) => {
        window.location.href = 'http://localhost:4200/admin/usuarios';
      },
    });
  }

  putApi() {
    this.http.put(`${environment.API_ROOSEVELT}/usuarios`, this.dataPostPut).subscribe({
      next: (resutl) => {
        window.location.href = 'http://localhost:4200/admin/usuarios';
      },
    });
  }

  validateData() {
    debugger;

    if(this.dataGet.id != null){
      this.userForm.controls?.['password'].valid;
    }

    if(this.dataGet.password != null && (this.userForm.controls?.["password"].value == null || this.userForm.controls?.["password"].value == '')){
      this.userForm.controls?.["password"].setValue(this.dataGet.password);
    }


    if (this.userForm?.valid) {
      this.dataPostPut['nombre'] = this.userForm.controls?.['nombre'].value;
      this.dataPostPut['apellido'] = this.userForm.controls?.['apellido'].value;
      this.dataPostPut['username'] = this.userForm.controls?.['username'].value;
      this.dataPostPut['fechaNac'] = this.userForm.controls?.['fechaNac'].value;
      this.dataPostPut['email'] = this.userForm.controls?.['email'].value;
      this.dataPostPut['tel'] = this.userForm.controls?.['tel'].value;
      this.dataPostPut['password'] = this.userForm.controls?.['password'].value;
      this.dataPostPut['administrador'] = this.userForm.controls?.['administrador'].value;
      this.dataPostPut['email_sec'] = this.userForm.controls?.['email_sec'].value;

      if (this.dataGet.id == null) {
        this.postApi();
      } else {
        for (const key in this.dataPostPut) {
          if (
            this.dataPostPut[key] == null ||
            this.dataPostPut[key] == undefined ||
            this.dataPostPut[key] == ''
          ) {
            this.dataPostPut[key] = this.dataGet[key];
          }
        }
        this.putApi();
      }
    } else {
      this.wasValidated();
    }
  }

  wasValidated() {
    const myForm = document.getElementById('myForm');
    myForm?.classList.add('was-validated');
  }

  resetValidated() {
    const myForm = document.getElementById('myForm');
    myForm?.classList.remove('was-validated');
  }
}
