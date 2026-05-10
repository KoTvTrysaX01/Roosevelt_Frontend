import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-rutas',
  imports: [RouterLink],
  templateUrl: './rutas.html',
  styleUrl: './rutas.scss',
})
export class Rutas implements OnInit{

  ngOnInit(): void {
    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = ["ID", "ID ZONA", "ID USUARIO", "NOMBRE", "COORDENADAS", "DESCRIPCIÓN", "FECHA", "LIKES", "PÚBLICO", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/rutas`).subscribe((result:any) => {
      this.dataArray = result;
    })
  }
}