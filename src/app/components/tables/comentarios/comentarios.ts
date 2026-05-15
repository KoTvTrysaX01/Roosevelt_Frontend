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
  selector: 'app-comentarios',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss',
})

// I am so sorry for everything I've done here
export class Comentarios implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  comentarioId: any;
  // get & upload data
  api_endpoint = 'comentarios';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    comentario: '',
    fecha_pub: '',
    ruta: {
      id: 0,
      nombreRuta: '',
      mapboxJSON: '',
      descripcion: '',
      fecha_pub: '',
      likesCount: 0,
      published: false,
    },
    usuario: {
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
  dataValues = ['ID', 'ID AUTOR', 'ID RUTA', 'COMENTARIO', 'FECHA DE CREACIÓN', 'ACCIONES'];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.comentarioId = params['id'];
    });

    if (this.comentarioId == undefined) {
      this.getApi();
    } else {
      this.getOneApi();
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
      .get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.comentarioId}`)
      .subscribe({
        next: (result: any) => {
          this.dataArray[0] = result;
        },
        error: (error) => {
          alert('Error al obtener el registro\n' + error.message);
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
}
