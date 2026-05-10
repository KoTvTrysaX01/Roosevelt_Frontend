import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-ajustes',
  imports: [RouterLink],
  templateUrl: './ajustes.html',
  styleUrl: './ajustes.scss',
})
export class Ajustes implements OnInit{

  ngOnInit(): void {
    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = ["ID", "USUARIO ID", "TEMA", "IDIOMA", "FOTO", "NOTICIAS", "NOTIFICACIONES", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/ajustes`).subscribe((result:any) => {
      this.dataArray = result;
    })
  }
}
