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
  selector: 'app-mensajes',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './mensajes.html',
  styleUrl: './mensajes.scss',
})

// I am so sorry for everything I've done here
export class Mensajes implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  mensajeId: any;

  // get & upload data
  api_endpoint = 'mensajes';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;
  dataGet: any = {
    id: 0,
    titulo: '',
    mensaje: '',
    nombre: '',
    email: '',
    tel: '',
    fecha_pub: '',
  };
  idDelete: any = null;

  // fill table data
  dataValues = [
    'ID',
    'TITULO',
    'MENSAJE',
    'NOMBRE',
    'EMAIL',
    'TELÉFONO',
    'FECHA DE PUBLICACIÓN',
    'ACCIONES',
  ];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.mensajeId = params['id'];
    });

    if (this.mensajeId == undefined) {
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
        alert('Error al obtener los registros');
      },
    });
  }

  getOneApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.mensajeId}`).subscribe({
      next: (result: any) => {
        this.dataArray[0] = result;
      },
      error: (error) => {
        alert('Error al obtener el registro');
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
}
