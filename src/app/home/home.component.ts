import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdSidenavModule } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   barbers: any;
   profile: any;

  constructor(private http: HttpClient, public auth: AuthService) { }  

    ngOnInit() {
    //   this.http.get('https://penguinhousedesigns.auth0.com/userinfo').subscribe((res)=>{
    //   console.log('this is user data',res);
    // })
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
      this.barbers = data;
      // console.log('users',this.barbers);
    });
    this.auth.handleAuthentication()

    }
}
