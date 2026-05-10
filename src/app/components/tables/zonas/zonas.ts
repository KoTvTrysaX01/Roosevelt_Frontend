import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-zonas',
  imports: [RouterLink],
  templateUrl: './zonas.html',
  styleUrl: './zonas.scss',
})
export class Zonas implements OnInit{

  ngOnInit(){
    this.getApiData();
    
  }

  http = inject(HttpClient);
  dataValues = ["ID", "NOMBRE", "COORDENADAS", "PELIGROSIDAD", "ACCIONES"];
  dataArray: any[] =  [];

  getApiData(){
    this.http.get(`${environment.API_ROOSEVELT}/zonas`).subscribe((result:any) => {
      this.dataArray = result;
    })
   
    
  }
}