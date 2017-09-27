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

  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


  profile: any;
  barbers: any;
  ifopen: true;


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
    this.service.getBarbers({id:1}).subscribe((data) => {
      console.log('getting barber data',data);
      this.barbers = data;
      localStorage.setItem('barbers', JSON.stringify(data))
    })
    this.service.getContacts({id:1}).subscribe((data) => {
      localStorage.setItem('clients', JSON.stringify(data))
    })
    this.service.getServices({id:1}).subscribe((data) => {
      localStorage.setItem('services', JSON.stringify(data))
    })

    }

  }
