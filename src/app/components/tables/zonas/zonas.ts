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
  selector: 'app-zonas',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './zonas.html',
  styleUrl: './zonas.scss',
})

// I am so sorry for everything I've done here
export class Zonas implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  zonaId: any;
  zonaForm!: FormGroup;

  // get & upload data
  api_endpoint = 'zonas';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    nombre_zona: '',
    mapbox_json: '',
    peligrosidad: '',
  };
  dataPostPut: any = {
    id: 0,
    nombre_zona: '',
    mapbox_json: '',
    peligrosidad: '',
  };
  idDelete: any = null;

  // fill table data
  dataValues = ['ID', 'NOMBRE', 'PELIGROSIDAD', 'ACCIONES'];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.zonaId = params['id'];
    });

    this.zonaForm = new FormGroup({
      nombre_zona: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9\\s]+'),
        Validators.maxLength(50),
      ]),
      mapbox_json: new FormControl('', [Validators.required, Validators.maxLength(600)]),
      peligrosidad: new FormControl('', Validators.required),
    });

    if (this.zonaId == undefined) {
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
      this.dataGet = data;
      this.zonaForm.controls['nombre_zona'].setValue(this.dataGet['nombre_zona']);
      this.zonaForm.controls['mapbox_json'].setValue(this.dataGet['mapbox_json']);
      this.zonaForm.controls['peligrosidad'].setValue(this.dataGet['peligrosidad']);
    } else {
      this.dataGet = {
        id: 0,
        nombre_zona: '',
        mapbox_json: '',
        peligrosidad: '',
      };
    }
  }

  closeFormModal() {
    this.resetValidated();
    this.zonaForm.reset();
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
    if (this.zonaForm?.valid) {
      for (const key in this.dataPostPut) {
        if (key != 'id') {
          this.dataPostPut[key] = this.zonaForm.controls?.[key].value;
        }
      }

      if (this.dataGet.id == 0) {
        this.postApi();
      } else {
        for (const key in this.dataPostPut) {
          if (
            this.dataPostPut[key] == 0 ||
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
          alert("Error al eliminar los registros");
        }
    });
  }

  getOneApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.zonaId}`).subscribe({
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
    debugger;
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
