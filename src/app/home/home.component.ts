import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ChartComponent } from 'angular2-chartjs';
import { Chart } from 'chart.js';
import { WalkdialogComponent } from '../walkdialog/walkdialog.component';
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

  public lineChartData:Array<any> = [ ];
  public lineChartLabels:Array<any> = ['Sun','Mon','Tues','Wed','Fri','Sat'];
  public lineChartType:string = 'line';
  
  public barChartLabels:string[] = [ ];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: 'Barbers'}
  ];
  

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


  shopwages: any;
  wagesarray = {data: [0,0,0,0,0,0,0], label: 'Wages' }
  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'))
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    this.barbers = JSON.parse(localStorage.getItem('barbers'))

    this.barbers.map((x)=>{
      this.barChartLabels.push(x.b_first)
    })
    

    let earnInfo = {
      'date1' : moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
      'date2' : moment(new Date()).format('YYYY-MM-DD'),
      'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
    }

    this.service.getShopWages(earnInfo).subscribe(data=>{
      this.shopwages = data
      console.log('this.shopwages',this.shopwages);

      this.shopwages.map(x=>{

        var hour = Number(x.appt_length[0])/60
        var min = Number(x.appt_length[1])
        var sec = Number(x.appt_length[2])
        var time = Number(hour + min + '.' + sec)

        this.barChartData[0].data.push(time)
        this.doughnutChartData[0] = this.doughnutChartData[0] + Number(x.total.split('$')[1])
        this.doughnutChartData[1] = this.doughnutChartData[1] + Number(x.tip.split('$')[1])
          if(this.lineChartLabels[0] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[0] = this.wagesarray.data[0] + Number(x.total.split('$')[1])
          }
          if(this.lineChartLabels[1] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[1] = this.wagesarray.data[1] + Number(x.total.split('$')[1])
          }
          if(this.lineChartLabels[2] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[2] = this.wagesarray.data[2] + Number(x.total.split('$')[1])
          }
          if(this.lineChartLabels[3] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[3] = this.wagesarray.data[3] + Number(x.total.split('$')[1])
          }
          if(this.lineChartLabels[4] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[4] = this.wagesarray.data[4] + Number(x.total.split('$')[1])
          }
          if(this.lineChartLabels[5] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[5] = this.wagesarray.data[5] + Number(x.total.split('$')[1])
          }
          if(this.lineChartLabels[6] == moment(x.start_time).format("ddd")){
            this.wagesarray.data[6] = this.wagesarray.data[6] + Number(x.total.split('$')[1])
          }
          this.lineChartData = this.wagesarray.data
      })
      
    })



  }

  
  openWalkDialog() {
    let dialogRef = this.dialog.open(WalkdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }


  }
