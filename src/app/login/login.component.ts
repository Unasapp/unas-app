import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from '../home/home.component'
import { LoginModelComponent } from '../login-model/login-model.component'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test: any;

  constructor(public dialog: MdDialog) {

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
