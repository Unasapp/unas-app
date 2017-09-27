import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ReportServiceService } from '../report-service.service';


@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.css']
})
export class LoginModelComponent implements OnInit {
  newUser:boolean;
  userData = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': ''
  }

  constructor(
    public dialogRef: MdDialogRef<LoginModelComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    public router: Router,
    public service: ReportServiceService) { }

  ngOnInit() {

  }

  // login(){
  //   console.log('here is userData -->',this.userData);
  //   this.service.login(this.userData)
  //   localStorage.setItem('profile', JSON.stringify(this.userData))
  //   this.dialogRef.close()
  //   this.router.navigate(['/home'])
  // }

  login(){
    if (this.newUser) {
      this.service.addUser(this.userData).subscribe((data) => {
        if (!data.fail) {
          localStorage.setItem('profile', JSON.stringify(data))
          this.dialogRef.close()
          this.router.navigate(['/home'])
        } else {
          alert(data.fail)
        }
      })
    } else {
      this.service.login(this.userData).subscribe((data) => {
        if (data.length === 1) {
          localStorage.setItem('profile', JSON.stringify(data))
          this.dialogRef.close()
          this.router.navigate(['/home'])
        } else {
          alert("Username or password is invalid!")
        }
      })
    }
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

}
