import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-testapi',
  imports: [],
  templateUrl: './testapi.html',
  styleUrl: './testapi.scss',
})
export class Testapi implements OnInit{

  ngOnInit(): void {
    this.getUsers();
  }

  http = inject(HttpClient);
  userList: any[] =  [];

  getUsers(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((result:any) => {
      this.userList = result;
    })
  }
}
