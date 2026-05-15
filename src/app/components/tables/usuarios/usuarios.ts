import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

// I am so sorry for everything I've done here
export class Usuarios implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  userId: any;
  userForm!: FormGroup;

  // get & upload data
  api_endpoint = 'usuarios';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
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

  // fill table data
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.userForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z\\s]+)$'),
        Validators.maxLength(50),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z\\s]+)$'),
        Validators.maxLength(50),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+)$'),
        Validators.maxLength(50),
      ]),
      fechaNac: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      email_sec: new FormControl('', [Validators.email, Validators.maxLength(100)]),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
      ]),
      password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      administrador: new FormControl(false),
    });

    if (this.userId == undefined) {
      this.getApi();
    } else {
      this.getOneApi();
    }
  }

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

  validateData() {
    if (
      this.dataGet.password != null &&
      (this.userForm.controls?.['password'].value == null ||
        this.userForm.controls?.['password'].value == '')
    ) {
      this.userForm.controls?.['password'].setValue(this.dataGet.password);
    }

    if (this.userForm?.valid) {
      for (const key in this.dataPostPut) {
        if (key != 'id') {
          this.dataPostPut[key] = this.userForm.controls?.[key].value;
        }
      }

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

  getApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}`).subscribe({
      next: (result: any) => {
        this.dataArray = result;
      },
      error: (error) => {
        alert('Error al obtener los registros');
      },
    });
  }

  getOneApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.userId}`).subscribe({
      next: (result: any) => {
        this.dataArray[0] = result;
      },
      error: (error) => {
        alert('Error al obtener el registro');
      },
    });
  }
  postApi() {
    this.http
      .post(`${environment.API_ROOSEVELT}/${this.api_endpoint}`, this.dataPostPut)
      .subscribe({
        next: (result) => {
          window.location.href = this.href;
        },
        error: (error) => {
          alert('Error al publicar el registro');
        },
      });
  }

  deleteApi() {
    this.http
      .delete(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.idDelete}`)
      .subscribe({
        next: (result) => {
          window.location.href = this.href;
        },
        error: (error) => {
          alert('Error al eliminar el registro');
        },
      });
  }

  putApi() {
    this.http.put(`${environment.API_ROOSEVELT}/${this.api_endpoint}`, this.dataPostPut).subscribe({
      next: (resutl) => {
        window.location.href = this.href;
      },
      error: (error) => {
        alert('Error al actualizar el registro');
      },
    });
  }
}
