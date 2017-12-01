import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ReportServiceService } from '../report-service.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { WalkdialogComponent } from '../walkdialog/walkdialog.component';

@Injectable()
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  cashResult: any;

  barbers = JSON.parse(localStorage.getItem('barbers'))
  services = JSON.parse(localStorage.getItem('services'))

  constructor(private http: Http, public dialog: MdDialog, public service: ReportServiceService, public router: Router) { }

  deleteEdit(x){
    // console.log('-- deleting trans --',x);
    for (var i = 0; i < this.report.length; i++) {
      if(this.report[i].a_id == x.a_id){
        this.report.splice(i,1)
      }
    }
    this.service.deleteTrans(x.a_id).subscribe()
    return this.report
  }

  saveEdit(x){
    // console.log('-- saving trans --',x);
    this.service.editTrans(x).subscribe()

  }

  timedeleteEdit(x){
    // console.log('-- deleting time --',x);
    for (var i = 0; i < this.timecards.length; i++) {
      if(this.timecards[i].t_id == x.t_id){
        this.timecards.splice(i,1)
      }
    }
    this.service.deleteTimecard(x.t_id).subscribe()
    return this.timecards
  }

  timesaveEdit(x){
    // console.log('-- saving time --',x);
    this.service.timesaveEdit(x).subscribe()

  }


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

  getProductReports(para){
    this.pastP = !this.pastP
    // var yet = false

    if(para=='past'){
      this.products = []
      let earnInfo = {
        'date1' : moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
        'date2' : moment(new Date()).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data=>{
       data.map(x=>{
         this.products.push({
           'p_id': x.p_id,
           'type': x.type,
           'product': x.product,
           'quantity': x.quantity,
           'sold': 0,
           'price': x.price,
           'netsales': 0
         })
       })
     })
      // console.log('get reports for past 7',earnInfo) 
          this.service.getProductsReport(earnInfo).subscribe(data =>{
            console.log('--- products for reports --',data);

            for (var i = 0; i < this.products.length; i++) {
              for (var j = 0; j < data.length; j++) {
                if(this.products[i].p_id == data[j].product_id) {
                  this.products[i].sold = this.products[i].sold + data[j].qty
                  this.products[i].netsales = this.products[i].netsales + (data[j].qty * Number(data[j].price.split('$')[1]))
                }
                if(this.products[i].p_id == data[j].product_id2) {
                  this.products[i].sold = this.products[i].sold + data[j].qty2
                  this.products[i].netsales = this.products[i].netsales + (data[j].qty2 * Number(data[j].price.split('$')[1]))
                }
              }
            }

       })
        // console.log('get reports for past 7',this.report);
      }
    else{
      this.products = []
      let earnInfo = {
        'date1' : moment(new Date()).format('YYYY-MM-DD'),
        'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data=>{
       data.map(x=>{
         this.products.push({
           'p_id': x.p_id,
           'type': x.type,
           'product': x.product,
           'quantity': x.quantity,
           'sold': 0,
           'price': x.price,
           'netsales': 0
         })
       })
     })
      this.service.getProductsReport(earnInfo).subscribe(data =>{
        // console.log('--- products for reports --',data);

        for (var i = 0; i < this.products.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if(this.products[i].p_id == data[j].product_id) {
              this.products[i].sold = this.products[i].sold + data[j].qty
              this.products[i].netsales = this.products[i].netsales + (data[j].qty * Number(data[j].price.split('$')[1]))
            }
            if(this.products[i].p_id == data[j].product_id2) {
              this.products[i].sold = this.products[i].sold + data[j].qty2
              this.products[i].netsales = this.products[i].netsales + (data[j].qty2 * Number(data[j].price.split('$')[1]))
            }
          }
        }
        console.log('get reports from today',this.products);
       })
    }

  }

  getReports(para){
    this.pastD = !this.pastD

    if(para=='past'){
      let earnInfo = {
        'date1' : moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
        'date2' : moment(new Date()).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      // console.log('get reports for past 7',earnInfo);
      this.service.getShopTrans(earnInfo).subscribe(trans => {
        for (let i = 0; i < trans.length; i++) {
          trans[i].start_time = moment(new Date(trans[i].start_time.split('.')[0])).format("l LT")
          trans[i].price = Number(trans[i].price.split('$')[1])
          trans[i].tip = Number(trans[i].tip.split('$')[1])
          trans[i].total = Number(trans[i].price) + Number(trans[i].tip)
          for (var k = 0; k < this.services.length; k++) {
            if(trans[i].service_id2 == this.services[k].v_id){
              trans[i].service2 = this.services[k].service
              trans[i].price2 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
            if(trans[i].service_id3 == this.services[k].v_id){
              trans[i].service3 = this.services[k].service
              trans[i].price3 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
            if(trans[i].service_id4 == this.services[k].v_id){
              trans[i].service4 = this.services[k].service
              trans[i].price4 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
            if(trans[i].service_id5 == this.services[k].v_id){
              trans[i].service5 = this.services[k].service
              trans[i].price5 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
          }
          trans[i].total = Number(trans[i].total.toFixed(2))
        }
              this.report = trans
           })
        // console.log('get reports for past 7',this.report);
      }
    else{
      let earnInfo = {
        'date1' : moment(new Date()).format('YYYY-MM-DD'),
        'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      // console.log('get reports from today',earnInfo);
      this.service.getShopTrans(earnInfo).subscribe(trans => {
        for (let i = 0; i < trans.length; i++) {
          trans[i].start_time = moment(new Date(trans[i].start_time.split('.')[0])).format("l LT")
          trans[i].price = Number(trans[i].price.split('$')[1])
          trans[i].tip = Number(trans[i].tip.split('$')[1])
          trans[i].total = Number(trans[i].price) + Number(trans[i].tip)
          for (var k = 0; k < this.services.length; k++) {
            if(trans[i].service_id2 == this.services[k].v_id){
              trans[i].service2 = this.services[k].service
              trans[i].price2 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
            if(trans[i].service_id3 == this.services[k].v_id){
              trans[i].service3 = this.services[k].service
              trans[i].price3 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
            if(trans[i].service_id4 == this.services[k].v_id){
              trans[i].service4 = this.services[k].service
              trans[i].price4 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
            if(trans[i].service_id5 == this.services[k].v_id){
              trans[i].service5 = this.services[k].service
              trans[i].price5 = Number(this.services[k].price.split('$')[1])
              trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
            }
          }
          trans[i].total = Number(trans[i].total.toFixed(2))
        }
              this.report = trans
           })
      // console.log('get reports from today',this.report);
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
       // console.log('get reports for past 7',earnInfo);
       this.service.getTimecards(earnInfo).subscribe(cards => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].time_in = moment(cards[i].time_in).format('LLLL')
          cards[i].time_out = moment(cards[i].time_out).format('LLLL')
          }
        // console.log(cards)
        this.timecards = cards
        })
         // console.log('get reports for past 7',this.report);
       }
     else{
       let earnInfo = {
         'date1' : moment(new Date()).format('YYYY-MM-DD'),
         'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
         'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
       }
       // console.log('get reports from today',earnInfo);
       this.service.getTimecards(earnInfo).subscribe(cards => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].time_in = moment(cards[i].time_in).format('LLLL')
          cards[i].time_out = moment(cards[i].time_out).format('LLLL')

        }
        // console.log(cards)
        this.timecards = cards
      })
       // console.log('get reports from today',this.report);
     }

  }

  getEarnReports(para){
    this.pastE = !this.pastE

     if(para=='past'){
      this.barearnings = []
      let earnInfo = {
        'date1' : moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
        'date2' : moment(new Date()).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      this.service.getBarberEarning(earnInfo).subscribe(data => {
        // console.log('--- earning 😈  back from db ---', data);

        if(data){
          this.barbers.map((x)=>{
            this.barearnings.push({
              'barber_id': x.b_id,
              'name': x.b_first + " " + x.b_last,
              'payT': '',
              'barberE': 0,
              'shopE': 0,
              'tips': 0
            })
          })
          // console.log('old barber earning shit',this.barearnings)
          this.go = true;
        }


        if(this.go == true){

          for (var i = 0; i < this.barearnings.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if(data[j].type == 'hourly' && this.barearnings[i].barber_id == data[j].b_id){
                // console.log('in it hourly');

                var rate = data[j].rate.split('/')[0].replace('$','')
                var time = 6;
                this.barearnings[i].payT = data[j].type +" - "+ data[j].rate
                this.barearnings[i].barberE = this.barearnings[i].barberE + (time * Number(rate))
                this.barearnings[i].shopE = Number(this.barearnings[i].shopE) + Number(data[j].total.split('$')[1])
                this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
                this.barearnings[i].shopE = this.barearnings[i].shopE.toFixed(2)
              }

              if(data[j].type == 'commission' && this.barearnings[i].barber_id == data[j].b_id){
                // console.log('in it commission');
                this.com = Number('.' + data[j].rate.split('%')[0])
                // console.log('this.com',typeof this.com, this.com)
                data[j].total = data[j].total.split('$')[1]
                this.barearnings[i].payT = data[j].type +" - "+ data[j].rate
                // console.log(this.barearnings[i].barberE , Number(data[j].total.replace('$','')) , Number(this.com) );

                this.barearnings[i].barberE = this.barearnings[i].barberE + (Number(data[j].total.replace('$','')) * Number(this.com))
                this.barearnings[i].shopE = Number(this.barearnings[i].shopE) + Number(data[j].total.replace('$','')) * (1-Number(this.com))
                this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
                this.barearnings[i].shopE = this.barearnings[i].shopE.toFixed(2)
              }

              if(data[j].type == 'booth rent' && this.barearnings[i].barber_id == data[j].b_id){
                // console.log('in it booth rent');
                this.barearnings[i].payT = data[j].type
                this.barearnings[i].barberE = this.barearnings[i].barberE + Number(data[j].total.split('$')[1])
                this.barearnings[i].shopE = data[j].rate
                this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
              }

            }
          }
          // console.log('this.barearnings',this.barearnings)
        }

      })

    }
    else{
      this.barearnings = []
      let earnInfo = {
        'date1' : moment(new Date()).format('YYYY-MM-DD'),
        'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
        'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      this.service.getBarberEarning(earnInfo).subscribe(data => {
        // console.log('--- earning 😈  back from db ---', data);

        if(data){
          this.barbers.map((x)=>{
            this.barearnings.push({
              'barber_id': x.b_id,
              'name': x.b_first + " " + x.b_last,
              'payT': '',
              'barberE': 0,
              'shopE': 0,
              'tips': 0
            })
          })
          // console.log('old barber earning shit',this.barearnings)
          this.go = true;
        }


        if(this.go == true){

          for (var i = 0; i < this.barearnings.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if(data[j].type == 'hourly' && this.barearnings[i].barber_id == data[j].b_id){
                // console.log('in it hourly');

                var rate = data[j].rate.split('/')[0].replace('$','')
                var time = 6;
                this.barearnings[i].payT = data[j].type +" - "+ data[j].rate
                this.barearnings[i].barberE = this.barearnings[i].barberE + (time * Number(rate))
                this.barearnings[i].shopE = Number(this.barearnings[i].shopE) + Number(data[j].total.split('$')[1])
                this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
                this.barearnings[i].shopE = this.barearnings[i].shopE.toFixed(2)
              }

              if(data[j].type == 'commission' && this.barearnings[i].barber_id == data[j].b_id){
                // console.log('in it commission');
                this.com = Number('.' + data[j].rate.split('%')[0])
                // console.log('this.com',typeof this.com, this.com)
                data[j].total = data[j].total.split('$')[1]
                this.barearnings[i].payT = data[j].type +" - "+ data[j].rate
                // console.log(this.barearnings[i].barberE , Number(data[j].total.replace('$','')) , Number(this.com) );

                this.barearnings[i].barberE = this.barearnings[i].barberE + (Number(data[j].total.replace('$','')) * Number(this.com))
                this.barearnings[i].shopE = Number(this.barearnings[i].shopE) + Number(data[j].total.replace('$','')) * (1-Number(this.com))
                this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
                this.barearnings[i].shopE = this.barearnings[i].shopE.toFixed(2)
              }

              if(data[j].type == 'booth rent' && this.barearnings[i].barber_id == data[j].b_id){
                // console.log('in it booth rent');
                this.barearnings[i].payT = data[j].type
                this.barearnings[i].barberE = this.barearnings[i].barberE + Number(data[j].total.split('$')[1])
                this.barearnings[i].shopE = data[j].rate
                this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
              }

            }
          }
          // console.log('this.barearnings',this.barearnings)
        }

      })

    }

  }


  // USER RIGHTS AND LOGOUT FUNCTION ----- DO NOT DELETE!!!
  profType:boolean;
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('barbers');
    localStorage.removeItem('clients');
    localStorage.removeItem('services');
    this.router.navigate(['/login'])
  }

  pastE: any;
  pastP: any
  pastT: any
  pastD: any
  barearnings= [];
  report: any = []
  timecards: any = []
  trans: any
  todaysdateDisplay = moment(new Date()).format('dddd, MMMM Do YYYY')
  todaysdate = new Date()
  com: any
  products = []
  go = false
  ngOnInit() {
    // USER TYPE -------------------- DO NOT DELETE!!
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    // console.log('reports loaded ---->>>>.',this.barbers)
    let earnInfo = {
      'date1' : moment(new Date().setDate(new Date().getDate() - 30)).format('YYYY-MM-DD'),
      'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
      'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
    }
    // let earnInfo = {
    //   'date1' : moment(new Date()).format('YYYY-MM-DD'),
    //   'date2' : moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD'),
    //   'shop_id' : JSON.parse(localStorage.getItem('profile'))[0].shop_id
    // }
    // console.log('earnInfo 😡', earnInfo);

    this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data=>{
      data.map(x=>{
        this.products.push({
          'p_id': x.p_id,
          'type': x.type,
          'product': x.product,
          'quantity': x.quantity,
          'sold': 0,
          'price': x.price,
          'netsales': 0
        })
      })

    })

    this.service.getProductsReport(earnInfo).subscribe(data =>{
      // console.log('--- products for reports --',data);

      for (var i = 0; i < this.products.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if(this.products[i].p_id == data[j].product_id) {
            this.products[i].sold = this.products[i].sold + data[j].qty
            this.products[i].netsales = this.products[i].netsales + (data[j].qty * Number(data[j].price.split('$')[1]))
          }
          if(this.products[i].p_id == data[j].product_id2) {
            this.products[i].sold = this.products[i].sold + data[j].qty2
            this.products[i].netsales = this.products[i].netsales + (data[j].qty2 * Number(data[j].price.split('$')[1]))
          }
        }
      }

     })

    this.service.getShopTrans(earnInfo).subscribe(trans => {
      // console.log('ive been called to get trans',trans);
      for (let i = 0; i < trans.length; i++) {
        trans[i].start_time = moment(new Date(trans[i].start_time.split('.')[0])).format("l LT")
        trans[i].price = Number(trans[i].price.split('$')[1])
        trans[i].tip = Number(trans[i].tip.split('$')[1])
        trans[i].total = Number(trans[i].price) + Number(trans[i].tip)
        for (var k = 0; k < this.services.length; k++) {
          if(trans[i].service_id2 == this.services[k].v_id){
            trans[i].service2 = this.services[k].service
            trans[i].price2 = Number(this.services[k].price.split('$')[1])
            trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
          }
          if(trans[i].service_id3 == this.services[k].v_id){
            trans[i].service3 = this.services[k].service
            trans[i].price3 = Number(this.services[k].price.split('$')[1])
            trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
          }
          if(trans[i].service_id4 == this.services[k].v_id){
            trans[i].service4 = this.services[k].service
            trans[i].price4 = Number(this.services[k].price.split('$')[1])
            trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
          }
          if(trans[i].service_id5 == this.services[k].v_id){
            trans[i].service5 = this.services[k].service
            trans[i].price5 = Number(this.services[k].price.split('$')[1])
            trans[i].total = trans[i].total + Number(this.services[k].price.split('$')[1])
          }
        }
        trans[i].total = trans[i].total.toFixed(2)
        trans[i].tip = trans[i].tip.toFixed(2)
      }
      this.report = trans
      // console.log('-- this is shop trans for week ---',this.report)
    })

    this.service.getTimecards(earnInfo).subscribe(cards => {
      console.log('cards ---------',cards)

      for (let i = 0; i < cards.length; i++) {
        cards[i].time_in = moment(cards[i].time_in).format("l LT")
        cards[i].time_out = moment(cards[i].time_out).format("l LT")

      }
      this.timecards = cards
    })



    this.service.getBarberEarning(earnInfo).subscribe(data => {
      console.log('--- earning 😈  back from db ---', data);

      if(data){
        this.barbers.map((x)=>{
          this.barearnings.push({
            'barber_id': x.b_id,
            'name': x.b_first + " " + x.b_last,
            'payT': '',
            'barberE': 0,
            'shopE': 0,
            'tips': 0
          })
        })
        // console.log('old barber earning shit',this.barearnings)
        this.go = true;
      }


      if(this.go == true){

        for (var i = 0; i < this.barearnings.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if(data[j].type == 'hourly' && this.barearnings[i].barber_id == data[j].b_id){
              // console.log('in it hourly');

              var rate = data[j].rate.split('/')[0].replace('$','')
              var time = 6;
              this.barearnings[i].payT = data[j].type +" - "+ data[j].rate
              this.barearnings[i].barberE = this.barearnings[i].barberE + (time * Number(rate))
              this.barearnings[i].shopE = Number(this.barearnings[i].shopE) + Number(data[j].total.split('$')[1])
              this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
              this.barearnings[i].shopE = this.barearnings[i].shopE.toFixed(2)
            }

            if(data[j].type == 'commission' && this.barearnings[i].barber_id == data[j].b_id){
              // console.log('in it commission');
              this.com = Number('.' + data[j].rate.split('%')[0])
              // console.log('this.com',typeof this.com, this.com)
              data[j].total = data[j].total.split('$')[1]
              this.barearnings[i].payT = data[j].type +" - "+ data[j].rate
              // console.log(this.barearnings[i].barberE , Number(data[j].total.replace('$','')) , Number(this.com) );

              this.barearnings[i].barberE = this.barearnings[i].barberE + (Number(data[j].total.replace('$','')) * Number(this.com))
              this.barearnings[i].shopE = Number(this.barearnings[i].shopE) + Number(data[j].total.replace('$','')) * (1-Number(this.com))
              this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
              this.barearnings[i].shopE = this.barearnings[i].shopE.toFixed(2)
            }

            if(data[j].type == 'booth rent' && this.barearnings[i].barber_id == data[j].b_id){
              // console.log('in it booth rent');
              this.barearnings[i].payT = data[j].type
              this.barearnings[i].barberE = this.barearnings[i].barberE + Number(data[j].total.split('$')[1])
              this.barearnings[i].shopE = Number(data[j].rate.split('$')[1].split('/')[0])
              this.barearnings[i].tips = this.barearnings[i].tips + Number(data[j].tip.split('$')[1])
            }
            // this.barearnings[i].barberE = this.barearnings[i].barberE.toFixed(2)
            // this.barearnings[i].shopE
            // this.barearnings[i].tips
          }
          this.barearnings[i].shopE = Number(this.barearnings[i].shopE.toFixed(2))
        }


      }

    })
    // end on init
  }


  openWalkDialog() {
    let dialogRef = this.dialog.open(WalkdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }

}
