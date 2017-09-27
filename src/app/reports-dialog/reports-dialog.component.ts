import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  styleUrls: ['./reports-dialog.component.css']
})
export class ReportsDialogComponent implements OnInit {
  newUser = {
    email: '',
    password: ''
  };

  constructor(private http: Http, public dialogRef: MdDialogRef<ReportsDialogComponent>) { }

  addNew(usercreds) {
    console.log('inside addnew')
    var headers = new Headers();
    var eObject = { email: usercreds.username,
                    password: usercreds.password,
                    headers: headers };
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    console.log('before sendmail')
    return this.http.post('/sendmail', eObject).subscribe((data) => {
      if (data.json().success) {
        console.log('Sent successfully');
      }
    })
  }

  addUser() {
    console.log('add user function')
    this.addNew(this.newUser);
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

  ngOnInit() {
  }

}
