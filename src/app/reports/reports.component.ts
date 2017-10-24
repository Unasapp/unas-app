import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ReportServiceService } from '../report-service.service';
import { Http, Headers } from '@angular/http';

@Injectable()
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  cashResult: any;
  
  barbers = JSON.parse(localStorage.getItem('barbers'))

  constructor(private http: Http, public dialog: MdDialog, public service: ReportServiceService) { }

  deleteEdit(x){
    console.log('-- deleting trans --',x);
    for (var i = 0; i < this.report.length; i++) {
      if(this.report[i].a_id == x.a_id){
        this.report.splice(i,1)
      }
    }
    this.service.deleteTrans(x.a_id).subscribe()
    return this.report
  }

  saveEdit(x){
    console.log('-- saving trans --',x);
    this.service.editTrans(x).subscribe()
    
  }

  timedeleteEdit(x){
    console.log('-- deleting time --',x);
    for (var i = 0; i < this.timecards.length; i++) {
      if(this.timecards[i].t_id == x.t_id){
        this.timecards.splice(i,1)
      }
    }
    this.service.deleteTimecard(x.t_id).subscribe()
    return this.timecards
  }

  timesaveEdit(x){
    console.log('-- saving time --',x);
    this.service.timesaveEdit(x).subscribe()
    
  }

  // openNewProduct() {
  //   let dialogRef = this.dialog.open(ProductDialogComponent, {
  //     width: '600px',
  //     data: 'this text is passed'
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //       let newproduct = {
  //         name: result.name,
  //         type: result.type,
  //         cost: result.cost,
  //         code: result.code
  //       }

  //       this.products.push(newproduct)
  //     }

  //   })
  // }

  openCashDialog() {
    let dialogRef = this.dialog.open(CashoutdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.cashResult = result;
      // console.log(result);

      if (result !== undefined) {
        let newreport = {
          "b_first": result.barber.split(' ').shift(),
          "b_last": result.barber.split(' ').pop(),
          "c_first": result.customer.split(' ').shift(),
          "c_last": result.customer.split(' ').pop(),
          "service": result.service,
          "date": moment(result.date).format('YYYY-M-D'),
          "price": result.price,
          "tip": result.tip,
          "total": result.amtpaid
        }
        // console.log(newreport);

        this.report.push(newreport)
      }

    })
  }

  openApptDialog() {
    let dialogRef = this.dialog.open(ApptdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }

  getReports(para){
    this.pastD = !this.pastD
   
    if(para=='past'){
      let earnInfo = {
        'date1' : moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
        'date2' : moment(new Date()).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      console.log('get reports for past 7',earnInfo);
      this.service.getShopTrans(earnInfo).subscribe(trans => { 
              for (let i = 0; i < trans.length; i++) {
                trans[i].start_time = moment(new Date(trans[i].start_time.split('.')[0])).format("l LT")
              }
              this.report = trans
           })
        console.log('get reports for past 7',this.report);
      }
    else{
      let earnInfo = {
        'date1' : moment(new Date()).format('YYYY-MM-DD'),
        'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      console.log('get reports from today',earnInfo);
      this.service.getShopTrans(earnInfo).subscribe(trans => { 
              for (let i = 0; i < trans.length; i++) {
                trans[i].start_time = moment(new Date(trans[i].start_time.split('.')[0])).format("l LT")
              }
              this.report = trans
           })
      console.log('get reports from today',this.report);
    }

  }

  getTimeCards(para){
    this.pastT = !this.pastT
    
     if(para=='past'){
       let earnInfo = {
         'date1' : moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
         'date2' : moment(new Date()).format('YYYY-MM-DD'),
         'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
       }
       console.log('get reports for past 7',earnInfo);
       this.service.getTimecards(earnInfo).subscribe(cards => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].time_in = moment(cards[i].time_in).format('LLLL')
          cards[i].time_out = moment(cards[i].time_out).format('LLLL')
          }
        // console.log(cards)
        this.timecards = cards
        })
         console.log('get reports for past 7',this.report);
       }
     else{
       let earnInfo = {
         'date1' : moment(new Date()).format('YYYY-MM-DD'),
         'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
         'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
       }
       console.log('get reports from today',earnInfo);
       this.service.getTimecards(earnInfo).subscribe(cards => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].time_in = moment(cards[i].time_in).format('LLLL')
          cards[i].time_out = moment(cards[i].time_out).format('LLLL')
  
        }
        // console.log(cards)
        this.timecards = cards
      })
       console.log('get reports from today',this.report);
     }

  }

  pastT: any
  pastD: any
  barearnings= [];
  report: any = []
  timecards: any = []
  trans: any
  todaysdateDisplay = moment(new Date()).format('dddd, MMMM Do YYYY')  
  todaysdate = new Date()
  com: any
  ngOnInit() {
    // console.log('reports loaded ---->>>>.',this.barbers)
    let earnInfo = {
      'date1' : moment(this.todaysdate).format('YYYY-MM-DD'),
      'date2' : moment(this.todaysdate.setDate(this.todaysdate.getDate() + 1)).format('YYYY-MM-DD'),
      'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
    }
    // console.log('earnInfo 😡', earnInfo);
    
    this.service.getShopTrans(earnInfo).subscribe(trans => {

      for (let i = 0; i < trans.length; i++) {
        // console.log('-- this is date before ---',trans[i].start_time)
        trans[i].start_time = moment(new Date(trans[i].start_time.split('.')[0])).format("l LT")
        // console.log('-- this is date after ---',trans[i].start_time)
      }
      this.report = trans
    })
    this.service.getTimecards(earnInfo).subscribe(cards => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].time_in = moment(cards[i].time_in).format('LLLL')
        cards[i].time_out = moment(cards[i].time_out).format('LLLL')

      }
      // console.log(cards)
      this.timecards = cards
    })

    this.service.getBarberEarning(earnInfo).subscribe(data => {
      // console.log('--- earning 😈  back from db ---', data);

      if(data){
        for (var i = 0; i < data.length-1; i++) {
          for (var j = i+1; j < data.length; j++) {
            // console.log(data[i].barber_id,'===',data[j].barber_id);
            if(data[i].barber_id == data[j].barber_id){
              data[i].tip = "$" + (Number(data[j].tip.split('$')[1]) + Number(data[i].tip.split('$')[1])).toFixed(2);
              data[i].total = "$" + (Number(data[j].total.split('$')[1]) + Number(data[i].total.split('$')[1])).toFixed(2);
              data.splice(j,1)
            }
          }
        }
      }

      data.map(x=>{
        
        if(x.type == 'hourly'){
          var rate = x.rate.split('/')[0].replace('$','')
          var time = 6;
          this.barearnings.push({
            'barber_id': x.barber_id,
            'name': x.b_first + " " + x.b_last,
            'payT': x.type +" - "+ x.rate,
            'barberE': '$' + (time * Number(rate)),
            'shopE': x.total,
            'tips': x.tip
          })
        }
        else if(x.type == 'commission'){
          this.com = '.' + x.rate.split('%')[0]
          x.total = x.total.split('$')[1]

          this.barearnings.push({
            'barber_id': x.barber_id,
            'name': x.b_first + " " + x.b_last,
            'payT': x.type +" - "+ x.rate,
            'barberE': '$' + (Number(x.total) * Number(this.com)).toFixed(2),
            'shopE': '$' + (Number(x.total) * (1-Number(this.com))).toFixed(2),
            'tips': x.tip
          })

        }
        else if(x.type == 'booth rent'){

          this.barearnings.push({
            'barber_id': x.barber_id,
            'name': x.b_first + " " + x.b_last,
            'payT': x.type,
            'barberE': x.total,
            'shopE': x.rate,
            'tips': x.tip
          })

        }
        // console.log('--- this.barearning after post processing --',this.barearnings);
        
      })

    })

  }

}

