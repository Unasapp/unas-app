import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ChartComponent } from 'angular2-chartjs';
import { Chart } from 'chart.js';
import { BarberModalComponent } from '../barber-modal/barber-modal.component'
import { ReportServiceService } from '../report-service.service';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public doughnutChartLabels:string[] = ['Wages', 'Tips'];
  public doughnutChartData:number[] = [450, 220];
  public doughnutChartType:string = 'doughnut';

  // events

  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';

  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


  profile: any;
  barbers = JSON.parse(localStorage.getItem('barbers'))
  ifopen: true;

  profType:boolean;
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('barbers');
    localStorage.removeItem('clients');
    localStorage.removeItem('services');
    this.router.navigate(['/login'])
  }

  constructor(private http: HttpClient, public dialog: MdDialog, private service: ReportServiceService, public router: Router) {


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
    }).afterClosed().subscribe(data => {
      if (data) {
        this.barbers.splice(this.barbers.findIndex(x => x.b_id === data),1);
      }
    })
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'))
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    this.barbers = JSON.parse(localStorage.getItem('barbers'))

    let earnInfo = {
      'date1' : moment(new Date()).format('YYYY-MM-DD'),
      'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
      'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
    }

    // this.service.getShopWages(earninfo).subscribe(data=>{

    // })



  }


  }
