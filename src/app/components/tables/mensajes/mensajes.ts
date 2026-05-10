import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-mensajes',
  imports: [RouterLink],
  templateUrl: './mensajes.html',
  styleUrl: './mensajes.scss',
})
export class Mensajes implements OnInit{

  ngOnInit(): void {
    this.getApiData();
  }

  http = inject(HttpClient);
  dataValues = ["ID", "TÍTULO", "MENSAJE", "NOMBRE", "CORREO", "TELÉFONO", "FECHA", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/mensajes`).subscribe((result:any) => {
      this.dataArray = result;
    })
  }
}
