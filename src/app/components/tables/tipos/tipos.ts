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
  selector: 'app-tipos',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tipos.html',
  styleUrl: './tipos.scss',
})

// I am so sorry for everything I've done here
export class Tipos implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  tipoId: any;
  tipoForm!: FormGroup;

  // get & upload data
  api_endpoint = 'tiposobjeto';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    nombre_tipo: '',
    icono: '',
  };
  dataPostPut: any = {
    id: 0,
    nombre_tipo: '',
    icono: '',
  };
  idDelete: any = null;

  // fill table data
  dataValues = ['ID', 'NOMBRE', 'ICONO', 'ACCIONES'];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.tipoId = params['id'];
    });

    this.tipoForm = new FormGroup({
      nombre_tipo: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+)$'),
        Validators.maxLength(30),
      ]),
      icono: new FormControl('', [
        Validators.required,
        Validators.pattern('^(.+)\/([^\/]+)$'),
        Validators.maxLength(50),
      ]),
    });

    if (this.tipoId == undefined) {
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

      this.tipoForm.controls['nombre_tipo'].setValue(this.dataGet['nombre_tipo']);
      this.tipoForm.controls['icono'].setValue(this.dataGet['icono']);
    } else {
      this.dataGet = {
        id: 0,
        nombre_tipo: '',
        icono: '',
      };
    }
  }

  closeFormModal() {
    this.resetValidated();
    this.tipoForm.reset();
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
    if (this.tipoForm?.valid) {
      for (const key in this.dataPostPut) {
        if (key != 'id') {
          this.dataPostPut[key] = this.tipoForm.controls?.[key].value;
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
        alert('Error al eliminar los registros\n' + error.message);
      },
    });
  }

  getOneApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.tipoId}`).subscribe({
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
