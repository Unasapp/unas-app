import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HomeComponent } from '../home/home.component'
import {  } from ''



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test: any;

  constructor(public auth: AuthService) {
    if(auth.userProfile){
      console.log(auth.userProfile);
    }
   }



  ngOnInit() {
    console.log('came back');
    
  }

}
