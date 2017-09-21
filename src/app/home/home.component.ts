import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { AuthService } from '../auth/auth.service';
import { ReportServiceService } from '../report-service.service';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   profile: any;
   barbers: any;
   ifopen: true;
   socket = io('http://localhost:4200');

  constructor(private http: HttpClient, public dialog: MdDialog, public auth: AuthService, private service: ReportServiceService) { }

  openCashDialog() {
    let dialogRef = this.dialog.open(CashoutdialogComponent,{
      width: '600px',
      data: 'this text is passed'
    })
  }
  openApptDialog() {
    let dialogRef = this.dialog.open(ApptdialogComponent,{
      width: '600px',
      data: 'this text is passed'
    })
  }

    ngOnInit() {
    //   this.http.get('https://penguinhousedesigns.auth0.com/userinfo').subscribe((res)=>{
    //   console.log('this is user data',res);
    // })

    this.socket.emit('my other event', { my: 'data' });
    console.log(this.socket)
    this.socket.on('news', function (data) {
      console.log(data);
      console.log(this.socket);

    });
    this.service.getBarbers({id:1}).subscribe((data) => {
      localStorage.setItem('barbers', JSON.stringify(data))
    })
    this.service.getContacts({id:1}).subscribe((data) => {
      localStorage.setItem('clients', JSON.stringify(data))
    })
    this.service.getServices({id:1}).subscribe((data) => {
      localStorage.setItem('services', JSON.stringify(data))
    })

    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
      this.barbers = data;
      // console.log('users',this.barbers);
    });
    this.auth.handleAuthentication()

    }
}
