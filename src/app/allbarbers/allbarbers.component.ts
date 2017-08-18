import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allbarbers',
  templateUrl: './allbarbers.component.html',
  styleUrls: ['./allbarbers.component.css']
})
export class AllbarbersComponent implements OnInit {

  barbers: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

     this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
        this.barbers = data;
        console.log('users',this.barbers);
    });
  }

}
