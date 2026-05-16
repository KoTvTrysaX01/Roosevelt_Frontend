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
  selector: 'app-ajustes',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ajustes.html',
  styleUrl: './ajustes.scss',
})

// I am so sorry for everything I've done here
export class Ajustes implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  ajuestesId: any;
  ajustesForm!: FormGroup;

  // get & upload data
  api_endpoint = 'ajustes';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    tema: '',
    idioma: '',
    foto: '',
    recibir_noticias: false,
    recibir_notificaciones: false,
    usuario: {
      id: null,
      username: '',
      email: '',
      password: '',
      email_sec: '',
      administrador: false,
      tel: '',
      fechaNac: '',
    },
  };
  dataPostPut: any = {
    id: 0,
    tema: '',
    idioma: '',
    foto: '',
    recibir_noticias: false,
    recibir_notificaciones: false,
    usuario: {
      id: null,
      username: '',
      email: '',
      password: '',
      email_sec: '',
      administrador: false,
      tel: '',
      fechaNac: '',
    },
  };
  idDelete: any = null;

  // fill table data
  dataValues = [
    'ID',
    'ID USUARIO',
    'TEMA',
    'IDIOMA',
    'FOTO',
    'NOTICIAS',
    'NOTIFICACIONES',
    'ACCIONES',
  ];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.ajuestesId = params['id'];
    });

    this.ajustesForm = new FormGroup({
      id_usuario: new FormControl({ value: null, disabled: true }, Validators.required),
      tema: new FormControl('', Validators.required),
      idioma: new FormControl('', Validators.required),
      foto: new FormControl('', [
        Validators.required,
        Validators.pattern('^(.+)\/([^\/]+)$'),
        Validators.maxLength(50),
      ]),
      recibir_noticias: new FormControl(false),
      recibir_notificaciones: new FormControl(false),
    });

    if (this.ajuestesId == undefined) {
      this.getApi();
    } else {
      this.getOneApi();
    }
  }

  openFormModal(data: any | undefined) {
    const modelDiv = document.getElementById('formModal');
    const noticias_checkbox = document.getElementById('noticias_check') as HTMLInputElement;
    const notificaciones_checkbox = document.getElementById(
      'notificaciones_check',
    ) as HTMLInputElement;
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }

    if (data != undefined) {
      debugger;
      this.ajustesForm.controls['id_usuario'].disable();
      this.dataGet = data;

      this.ajustesForm.controls['id_usuario'].setValue(this.dataGet.usuario.id);
      this.ajustesForm.controls['tema'].setValue(this.dataGet['tema']);
      this.ajustesForm.controls['idioma'].setValue(this.dataGet['idioma']);
      this.ajustesForm.controls['foto'].setValue(this.dataGet['foto']);
      this.ajustesForm.controls['recibir_noticias'].setValue(this.dataGet['recibir_noticias']);
      this.ajustesForm.controls['recibir_notificaciones'].setValue(
        this.dataGet['recibir_notificaciones'],
      );

      this.ajustesForm?.controls?.['id_usuario'].removeValidators(Validators.required);
      if (noticias_checkbox != null) {
        noticias_checkbox.checked = this.dataGet.recibir_noticias;
      }
      if (notificaciones_checkbox != null) {
        notificaciones_checkbox.checked = this.dataGet.recibir_notificaciones;
      }
    } else {
      this.dataGet = {
        id: 0,
        tema: '',
        idioma: '',
        foto: '',
        recibir_noticias: false,
        recibir_notificaciones: false,
        usuario: {
          id: null,
          username: '',
          email: '',
          password: '',
          email_sec: '',
          administrador: false,
          tel: '',
          fechaNac: '',
        },
      };
      this.ajustesForm?.controls?.['id_usuario'].setValidators(Validators.required);
      noticias_checkbox.checked = false;
      notificaciones_checkbox.checked = false;
      this.ajustesForm.controls['id_usuario'].enable();
    }
  }

  closeFormModal() {
    this.resetValidated();
    this.ajustesForm.reset();
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
    debugger;
    if (this.ajustesForm?.valid) {
      this.dataPostPut.usuario.id = this.ajustesForm.controls?.['id_usuario'].value;
      for (const key in this.dataPostPut) {
        if (key != 'id' && key != 'usuario') {
          this.dataPostPut[key] = this.ajustesForm.controls?.[key].value;
        }
      }

      if (this.dataGet.id == 0) {
        this.postApi();
      } else {
        this.dataPostPut['id'] = this.dataGet['id'];
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
        alert('Error al obtener los registros\n' + error.message);
      },
    });
  }

  getOneApi() {
    this.http
      .get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.ajuestesId}`)
      .subscribe({
        next: (result: any) => {
          this.dataArray[0] = result;
        },
        error: (error) => {
          alert('Error al obtener el registro\n' + error.message);
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
          alert('Error al publicar el registro\n' + error.message);
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
          alert('Error al eliminar el registro\n' + error.message);
        },
      });
  }

  putApi() {
    this.http.put(`${environment.API_ROOSEVELT}/${this.api_endpoint}`, this.dataPostPut).subscribe({
      next: (resutl) => {
        window.location.href = this.href;
      },
      error: (error) => {
        alert('Error al actualizar el registro\n' + error.message);
      },
    });
  }
}
