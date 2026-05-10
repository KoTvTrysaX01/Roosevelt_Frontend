import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-objetos',
  imports: [RouterLink],
  templateUrl: './objetos.html',
  styleUrl: './objetos.scss',
})
export class Objetos implements OnInit{

  ngOnInit(): void {
    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = ["ID", "ID ZONA", "ID TIPO", "NOMBRE", "COORDENADAS", "DESCRIPCIÓN", "IMAGEN", "PELIGROCIDAD", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/objetos`).subscribe((result:any) => {
      this.dataArray = result;
    })
  }
}