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
  selector: 'app-objetos',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './objetos.html',
  styleUrl: './objetos.scss',
})

// I am so sorry for everything I've done here
export class Objetos implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  objetoId: any;
  objetoForm!: FormGroup;

  // get & upload data
  api_endpoint = 'objetos';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    mapBoxJSON: '',
    nombre_objeto: '',
    descripcion: '',
    imagen: '',
    peligrosidad: '',
    zona: {
      id: 0,
      nombre_zona: '',
      mapbox_json: '',
    },
    tipoObjeto: {
      id: 0,
      nombre_tipo: '',
      icono: '',
    },
  };

  dataPostPut: any = {
    id: 0,
    mapBoxJSON: '',
    nombre_objeto: '',
    descripcion: '',
    imagen: '',
    peligrosidad: '',
    zona: {
      id: 0,
      nombre_zona: '',
      mapbox_json: '',
    },
    tipoObjeto: {
      id: 0,
      nombre_tipo: '',
      icono: '',
    },
  };
  idDelete: any = null;

  // fill table data
  dataValues = [
    'ID',
    'ID ZONA',
    'ID TIPO',
    'NOMBRE',
    'DESCRIPCIÓN',
    'IMAGEN',
    'PELIGROSIDAD',
    'ACCIONES',
  ];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.objetoId = params['id'];
    });

    this.objetoForm = new FormGroup({
      id_zona: new FormControl({ value: null, disabled: true }, Validators.required),
      id_tipo: new FormControl({ value: null, disabled: true }, Validators.required),
      nombre_objeto: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9\\s]+'),
      ]),
      mapBoxJSON: new FormControl('', [Validators.required, Validators.maxLength(600)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      peligrosidad: new FormControl('', Validators.required),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern('^(.+)\/([^\/]+)$'),
        Validators.maxLength(50),
      ]),
    });

    if (this.objetoId == undefined) {
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
      this.objetoForm.controls['id_zona'].disable();
      this.objetoForm.controls['id_tipo'].disable();
      this.dataGet = data;

      this.objetoForm.controls['id_zona'].setValue(this.dataGet.zona.id);
      this.objetoForm.controls['id_tipo'].setValue(this.dataGet.tipoObjeto.id);
      this.objetoForm.controls['mapBoxJSON'].setValue(this.dataGet['mapBoxJSON']);
      this.objetoForm.controls['nombre_objeto'].setValue(this.dataGet['nombre_objeto']);
      this.objetoForm.controls['descripcion'].setValue(this.dataGet['descripcion']);
      this.objetoForm.controls['imagen'].setValue(this.dataGet['imagen']);
      this.objetoForm.controls['peligrosidad'].setValue(this.dataGet['peligrosidad']);

      this.objetoForm?.controls?.['id_zona'].removeValidators(Validators.required);
      this.objetoForm?.controls?.['id_tipo'].removeValidators(Validators.required);
    } else {
      this.dataGet = {
        id: 0,
        mapBoxJSON: '',
        nombre_objeto: '',
        descripcion: '',
        imagen: '',
        peligrosidad: '',
        zona: {
          id: 0,
          nombre_zona: '',
          mapbox_json: '',
        },
        tipoObjeto: {
          id: 0,
          nombre_tipo: '',
          icono: '',
        },
      };
      this.objetoForm?.controls?.['id_zona'].setValidators(Validators.required);
      this.objetoForm.controls['id_zona'].enable();

      this.objetoForm?.controls?.['id_tipo'].setValidators(Validators.required);
      this.objetoForm.controls['id_tipo'].enable();
    }
  }

  closeFormModal() {
    this.resetValidated();
    this.objetoForm.reset();
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
    if (this.objetoForm?.valid) {
      this.dataPostPut.zona.id = this.objetoForm.controls?.['id_zona'].value;
      this.dataPostPut.tipoObjeto.id = this.objetoForm.controls?.['id_tipo'].value;
      for (const key in this.dataPostPut) {
        if (key != 'id' && key != 'zona' && key != 'tipoObjeto') {
          this.dataPostPut[key] = this.objetoForm.controls?.[key].value;
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
      error: (error) => {
        alert('Error al obtener los registros');
      },
    });
  }

  getOneApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.objetoId}`).subscribe({
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
