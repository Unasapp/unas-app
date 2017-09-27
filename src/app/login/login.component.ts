import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { HomeComponent } from '../home/home.component'
import { LoginModelComponent } from '../login-model/login-model.component'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test: any;

  constructor(public auth: AuthService,  public dialog: MdDialog) {
    if(auth.userProfile){
      console.log(auth.userProfile);
    }
   }

   openLoginDialog() {
    let dialogRef = this.dialog.open(LoginModelComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }



  ngOnInit() {
    console.log('came back');
    
  }

}
