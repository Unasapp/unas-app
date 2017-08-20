import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdSidenavModule } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   barbers: any;
   ifopen: true;

  constructor(private http: HttpClient) { }  


    ngOnInit() {
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
        this.barbers = data;
        console.log('users',this.barbers);
    });
    }
}
