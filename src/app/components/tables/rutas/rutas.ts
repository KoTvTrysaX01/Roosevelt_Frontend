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
  selector: 'app-rutas',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './rutas.html',
  styleUrl: './rutas.scss',
})

// I am so sorry for everything I've done here
export class Rutas implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  rutaId: any;
  rutaForm!: FormGroup;

  // get & upload data
  api_endpoint = 'rutas';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    nombreRuta: '',
    mapboxJSON: '',
    descripcion: '',
    fecha_pub: '',
    likesCount: 0,
    published: false,
    zona: {
      id: 0,
      nombre_zona: '',
      mapbox_json: '',
    },
    usuario_autor: {
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
    },
  };

  dataPostPut: any = {
    id: 0,
    nombreRuta: '',
    mapboxJSON: '',
    descripcion: '',
    fecha_pub: '',
    likesCount: 0,
    published: false,
    zona: {
      id: 0,
      nombre_zona: '',
      mapbox_json: '',
    },
    usuario_autor: {
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
    },
  };
  idDelete: any = null;

  // fill table data
  dataValues = [
    'ID',
    'ID AUTOR',
    'ID ZONA',
    'NOMBRE',
    'DESCRIPCIÓN',
    'FECHA DE CREACIÓN',
    'LIKES',
    'PÚBLICO',
    'ACCIONES',
  ];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.rutaId = params['id'];
    });

    this.rutaForm = new FormGroup({
      id_zona: new FormControl({ value: null, disabled: true }, Validators.required),
      id_usuario: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreRuta: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9\\s]+')]),
      mapboxJSON: new FormControl('', [Validators.required, Validators.maxLength(600)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      fecha_pub: new FormControl('', [Validators.required]),
      likesCount: new FormControl({ value: 0, disabled: true }),
      published: new FormControl(false),
    });

    if (this.rutaId == undefined) {
      this.getApi();
    } else {
      this.getOneApi();
    }
  }

  openFormModal(data: any | undefined) {
    const modelDiv = document.getElementById('formModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }

    if (data != undefined) {
      this.rutaForm.controls['id_zona'].disable();
      this.rutaForm.controls['id_usuario'].disable();
      this.dataGet = data;

      this.rutaForm.controls['id_zona'].setValue(this.dataGet.zona.id);
      this.rutaForm.controls['id_usuario'].setValue(this.dataGet.usuario_autor.id);
      this.rutaForm.controls['mapboxJSON'].setValue(this.dataGet['mapboxJSON']);
      this.rutaForm.controls['nombreRuta'].setValue(this.dataGet['nombreRuta']);
      this.rutaForm.controls['descripcion'].setValue(this.dataGet['descripcion']);
      this.rutaForm.controls['fecha_pub'].setValue(this.dataGet['fecha_pub']);
      this.rutaForm.controls['likesCount'].setValue(this.dataGet['likesCount']);
      this.rutaForm.controls['published'].setValue(this.dataGet['published']);

      this.rutaForm?.controls?.['id_zona'].removeValidators(Validators.required);
      this.rutaForm?.controls?.['id_usuario'].removeValidators(Validators.required);
    } else {
      this.dataGet = {
        id: 0,
        nombreRuta: '',
        mapboxJSON: '',
        descripcion: '',
        fecha_pub: '',
        likesCount: 0,
        published: false,
        zona: {
          id: null,
          nombre_zona: '',
          mapbox_json: '',
          peligrosidad: ''
        },
        usuario_autor: {
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
        },
      };
      this.rutaForm?.controls?.['id_zona'].setValidators(Validators.required);
      this.rutaForm.controls['id_zona'].enable();

      this.rutaForm?.controls?.['id_usuario'].setValidators(Validators.required);
      this.rutaForm.controls['id_usuario'].enable();
    }
  }

  closeFormModal() {
    this.resetValidated();
    this.rutaForm.reset();
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
    if (this.rutaForm?.valid) {
      this.dataPostPut.zona.id = this.rutaForm.controls?.['id_zona'].value;
      this.dataPostPut.usuario_autor.id = this.rutaForm.controls?.['id_usuario'].value;

      for (const key in this.dataPostPut) {
        if (key != 'id' && key != 'zona' && key != 'usuario_autor') {
          this.dataPostPut[key] = this.rutaForm.controls?.[key].value;
        }
      }

      if (this.dataGet.id == 0) {
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
    });
  }

  getOneApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.rutaId}`).subscribe({
      next: (result: any) => {
        this.dataArray[0] = result;
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
      });
  }

  deleteApi() {
    this.http
      .delete(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.idDelete}`)
      .subscribe({
        next: (result) => {
          window.location.href = this.href;
        },
      });
  }

  putApi() {
    this.http.put(`${environment.API_ROOSEVELT}/${this.api_endpoint}`, this.dataPostPut).subscribe({
      next: (resutl) => {
        window.location.href = this.href;
      },
    });
  }
}
