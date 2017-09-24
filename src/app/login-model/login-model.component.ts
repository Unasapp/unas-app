import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.css']
})
export class LoginModelComponent implements OnInit {

  userData = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': ''
  }

  constructor(public dialogRef: MdDialogRef<LoginModelComponent>,
    @Inject(MD_DIALOG_DATA) public data: any, public router: Router) { }

  ngOnInit() {
    
  }

  login(){
    console.log('here is userData -->',this.userData);
    localStorage.setItem('profile', JSON.stringify(this.userData))
    
    this.dialogRef.close()
    this.router.navigate(['/home'])
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

}
