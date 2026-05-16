import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { PieChart } from '../../pie-chart/pie-chart';

@Component({
  selector: 'app-estadisticas',
  imports: [PieChart],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas implements OnInit {
  ages: number[] = [];
  isLoaded: boolean = false;
  ngOnInit(): void {
    this.getCantidadDeRegistros();
    this.getRutaMasPopular();
    this.getTipoObjetoMasUsado();
    this.getCantidadAdmins();
    this.getCantidadRutasPublicadas();
    this.getCantidadSubNoticias();
    this.getCantidadSubNotificaciones();
    this.getCantidadZonasPeligrosas();
    this.getCantidadObjetosPeligrosos();
  }

  http = inject(HttpClient);
  dataValues = [
    'ZONAS',
    'RUTAS',
    'OBJETOS',
    'TIPOS DE OBJETOS',
    'USUARIOS',
    'COMENTARIOS',
    'SOLICITUDES',
    'MENSAJES',
  ];
  cantidadDeRegistros: any = {
    zonas: 0,
    rutas: 0,
    objetos: 0,
    tiposobjeto: 0,
    usuarios: 0,
    comentarios: 0,
    solicitudes: 0,
    mensajes: 0,
  };

  rutaPopular: any = {
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

  tipoUsado: any = {
    id: 0,
    nombre_tipo: '',
    icono: '',
  };

  cantidadAdmins: any = {
    usuarios: 0,
  };
  cantidadRutasPublicadas: any = {
    rutas: 0,
  };

  cantidadSubNoticias: any = {
    cantidad_noticias: 0,
  };

  cantidadSubNotificaciones: any = {
    cantidad_noticias: 0,
  };

  cantidadZonasPeligrosas: any = {
    zonas: 0,
  };

  cantidadObjetosPeligrosos: any = {
    objetos: 0,
  };
  getCantidadDeRegistros() {
    for (const key in this.cantidadDeRegistros) {
      this.http.get<any>(`${environment.API_ROOSEVELT}/${key}/count`).subscribe({
        next: (result) => {
          this.cantidadDeRegistros[key] = result[key];
        },
      });
    }
  }

  getAges() {
    this.http.get<number[]>(`${environment.API_ROOSEVELT}/usuarios/count/ages`).subscribe({
      next: (result) => {
        this.ages = result;
      },
    });
    this.isLoaded = true;
  }

  getRutaMasPopular() {
    this.http.get(`${environment.API_ROOSEVELT}/rutas/popular`).subscribe({
      next: (result) => {
        this.rutaPopular = result;
      },
    });
  }

  getTipoObjetoMasUsado() {
    this.http.get(`${environment.API_ROOSEVELT}/tiposobjeto/masusado`).subscribe({
      next: (result) => {
        this.tipoUsado = result;
      },
    });
  }

  getCantidadAdmins() {
    this.http.get(`${environment.API_ROOSEVELT}/usuarios/count/admins`).subscribe({
      next: (result) => {
        this.cantidadAdmins = result;
      },
    });
  }

  getCantidadRutasPublicadas() {
    this.http.get(`${environment.API_ROOSEVELT}/rutas/count/published`).subscribe({
      next: (result) => {
        this.cantidadRutasPublicadas = result;
      },
    });
  }

  getCantidadSubNoticias() {
    this.http.get(`${environment.API_ROOSEVELT}/ajustes/count/noticias`).subscribe({
      next: (result) => {
        this.cantidadSubNoticias = result;
      },
    });
  }

  getCantidadSubNotificaciones() {
    this.http.get(`${environment.API_ROOSEVELT}/ajustes/count/notificaciones`).subscribe({
      next: (result) => {
        this.cantidadSubNotificaciones = result;
      },
    });
  }

  getCantidadZonasPeligrosas() {
    this.http.get(`${environment.API_ROOSEVELT}/zonas/count/peligrosidad`).subscribe({
      next: (result) => {
        this.cantidadZonasPeligrosas = result;
      },
    });
  }

  getCantidadObjetosPeligrosos() {
    this.http.get(`${environment.API_ROOSEVELT}/objetos/count/peligrosidad`).subscribe({
      next: (result) => {
        this.cantidadObjetosPeligrosos = result;
      },
    });
  }
}
