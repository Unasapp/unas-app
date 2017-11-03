import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from '../home/home.component'
import { LoginModelComponent } from '../login-model/login-model.component'
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test: any;

  constructor(public router: Router, public dialog: MdDialog) {

   }

   openLoginDialog() {
    let dialogRef = this.dialog.open(LoginModelComponent, {
      width: '600px',
      data: 'this text is passed'
    }).afterClosed().subscribe(data => {
      
      if (data == 'Owner') {
        console.log('data after closed Owner -->>>',data);
        this.router.navigate(['/home'])
      }
      if (data == 'User') {
        console.log('data after closed User -->>>',data);
        this.router.navigate(['/calender'])
      }
    })

  }



  ngOnInit() {
    console.log('came back');

  }

}
