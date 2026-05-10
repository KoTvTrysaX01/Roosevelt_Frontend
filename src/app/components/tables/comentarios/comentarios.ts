import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-comentarios',
  imports: [RouterLink],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss',
})
export class Comentarios implements OnInit{

  ngOnInit(): void {
    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = ["ID", "ID USUARIO", "ID RUTA", "COMENTARIO", "FECHA", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/comentarios`).subscribe((result:any) => {
      this.dataArray = result;
    })
  }
}
