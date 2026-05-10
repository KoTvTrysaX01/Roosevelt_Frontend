import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-tipos',
  imports: [RouterLink],
  templateUrl: './tipos.html',
  styleUrl: './tipos.scss',
})
export class Tipos implements OnInit{

  ngOnInit(): void {
    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = ["ID", "NOMBRE", "ICONO", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/tiposobjeto`).subscribe((result:any) => {
      this.dataArray = result;
    })
  }
}