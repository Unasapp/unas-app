import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { AuthService } from '../auth/auth.service';
import { ChartComponent } from 'angular2-chartjs';
import { Chart } from 'chart.js';
import { BarberModalComponent } from '../barber-modal/barber-modal.component'
import { ReportServiceService } from '../report-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  barbers: any;
  ifopen: true;

  type = 'radar';
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["red", "blue", "green", "blue", "red", "blue"],
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


  constructor(private http: HttpClient, public dialog: MdDialog, public auth: AuthService, private service: ReportServiceService) {
    this.profile = localStorage.getItem('profile')
    console.log(this.profile);
    
   }

  openCashDialog() {
    let dialogRef = this.dialog.open(CashoutdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }
  openApptDialog() {
    let dialogRef = this.dialog.open(ApptdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }
  openBarberModal(selectedBarber) {
    let dialogRef = this.dialog.open(BarberModalComponent, {
      width: '600px',
      data: selectedBarber

    })
  }

  ngOnInit() {
    //   this.http.get('https://penguinhousedesigns.auth0.com/userinfo').subscribe((res)=>{
    //   console.log('this is user data',res);
    // })
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
    // this.auth.authenticated()
    this.auth.getUserData()
    }

  }
