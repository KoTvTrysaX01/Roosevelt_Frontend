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
  selector: 'app-solicitudes',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})

// I am so sorry for everything I've done here
export class Solicitudes implements OnInit {
  // functions
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  // id & form
  titulo: any;
  solicitudId: any;
  // get & upload data
  api_endpoint = 'solicitudes';
  href = `http://localhost:4200/admin/${this.api_endpoint}`;

  rutaPut: any = {
    id: 1,
    nombreRuta: 'vadim',
    mapboxJSON: '123',
    descripcion: '123',
    fecha_pub: '1991-01-01',
    likesCount: 0,
    published: true,
    zona: {
      id: 1,
      nombre_zona: '',
      mapbox_json: '',
      peligrosidad: '1',
    },
    usuario_autor: {
      id: 1,
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

  dataGet: any = {
    solicitudId: {
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
    },
    fecha_pub: '',
    aprobada: null,
  };

  dataSolicitudPut: any = {
    solicitudId: {
      ruta: {
        id: 0,
        likesCount: 0,
        published: false,
      },
      usuario: {
        id: null,
        administrador: false,
      },
    },
    fecha_pub: '',
    aprobada: null,
  };

  idDelete: any = null;

  // fill table data
  dataValues = ['ID USUARIO', 'ID RUTA', 'FECHA DE PUBLICACIÓN', 'ACCIONES'];
  dataArray: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.solicitudId = params['id'];
    });

    if (this.solicitudId == undefined) {
      this.getApi();
    } else {
      this.getOneApi();
    }
  }


  // Will clean only if have time. It's 01:51
  openDecisionModal(data: any, decision: any) {
    this.titulo = decision;

    debugger;
    this.rutaPut.id = data.solicitudId.ruta.id;

    this.rutaPut.nombreRuta = data.solicitudId.ruta.nombreRuta;
    this.rutaPut.descripcion = data.solicitudId.ruta.descripcion;
    this.rutaPut.fecha_pub = data.solicitudId.ruta.fecha_pub;
    this.rutaPut.likesCount = data.solicitudId.ruta.likesCount;
    this.rutaPut.zona.id = data.solicitudId.ruta.zona.id;
    this.rutaPut.zona.nombre_zona = data.solicitudId.ruta.zona.nombre_zona;
    this.rutaPut.zona.mapbox_json = data.solicitudId.ruta.zona.mapbox_json;
    this.rutaPut.zona.peligrosidad = data.solicitudId.ruta.zona.peligrosidad;

    this.dataSolicitudPut.solicitudId.ruta.id = data.solicitudId.ruta.id;
    this.dataSolicitudPut.solicitudId.ruta.likesCount = data.solicitudId.ruta.likesCount;
    this.dataSolicitudPut.solicitudId.usuario.id = data.solicitudId.usuario.id;
    this.dataSolicitudPut.solicitudId.usuario.administrador = data.solicitudId.usuario.administrador;
    this.dataSolicitudPut.fecha_pub = data.fecha_pub;

    if (decision == 'Acceptar') {
      data.solicitudId.ruta.published = true;
      data.aprobada = true;

      this.rutaPut.published = data.solicitudId.ruta.published;
      this.dataSolicitudPut.aprobada = data.aprobada;
    } else if (decision == 'Denegar') {
      data.solicitudId.ruta.published = false;
      data.aprobada = false;
      this.dataSolicitudPut.aprobada = data.aprobada;
      this.rutaPut.published = data.solicitudId.ruta.published;
    }
    const modelDiv = document.getElementById('decisionModal');

    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeDecisionModal() {
    const modelDiv = document.getElementById('decisionModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  makeDecision() {
    debugger;
    // this.putApi('solicitudes', this.dataSolicitudPut);
    // this.putApi('rutas', this.dataSolicitudPut.solicitudId.ruta);

     this.http.put(`${environment.API_ROOSEVELT}/rutas`, this.rutaPut).subscribe({
       next: (resutl) => {
         // window.location.href = this.href;
       },
     });

    this.http.put(`${environment.API_ROOSEVELT}/solicitudes`, this.dataSolicitudPut).subscribe({
      next: (resutl) => {
        // window.location.href = this.href;
      },
    });
  }

  getApi() {
    this.http.get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/nuevas`).subscribe({
      next: (result: any) => {
        this.dataArray = result;
      },
    });
  }

  getOneApi() {
    this.http
      .get(`${environment.API_ROOSEVELT}/${this.api_endpoint}/${this.solicitudId}`)
      .subscribe({
        next: (result: any) => {
          this.dataArray[0] = result;
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

  putApi(endpoint: any, data: any) {
    this.http.put(`${environment.API_ROOSEVELT}/${endpoint}`, data).subscribe({
      next: (resutl) => {
        window.location.href = this.href;
      },
    });
  }
}
