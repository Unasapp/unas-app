import { Component, OnInit, Injectable } from '@angular/core';
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
  newUser = {
    email: '',
    password: ''
  };

  constructor(private http: Http, public dialog: MdDialog, public reportServiceService: ReportServiceService) { }

  addNew(usercreds) {
    console.log('inside addnew')
    var headers = new Headers();
    var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
    var eObject = { email: usercreds.username,
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

  openNewProduct() {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let newproduct = {
          name: result.name,
          type: result.type,
          cost: result.cost,
          code: result.code
        }

        this.products.push(newproduct)
      }

    })
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

  report: any = []

  timecards: any = []
  //     {
  //         "b_first": "Harry",
  //         "b_last": "Vu",
  //         "in": moment("2017-08-13T15:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-13T18:30:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Harry",
  //         "b_last": "Vu",
  //         "in": moment("2017-08-13T19:30:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-14T02:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Andrew",
  //         "b_last": "Chen",
  //         "in": moment("2017-08-13T15:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-13T18:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Andrew",
  //         "b_last": "Chen",
  //         "in": moment("2017-08-13T18:30:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-14T02:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Dom",
  //         "b_last": "Decicco",
  //         "in": moment("2017-08-13T15:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-13T19:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Dom",
  //         "b_last": "Decicco",
  //         "in": moment("2017-08-13T20:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-14T02:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Harry",
  //         "b_last": "Vu",
  //         "in": moment("2017-08-14T15:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-14T19:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Harry",
  //         "b_last": "Vu",
  //         "in": moment("2017-08-14T20:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-15T02:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Andrew",
  //         "b_last": "Chen",
  //         "in": moment("2017-08-14T15:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-14T18:30:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Andrew",
  //         "b_last": "Chen",
  //         "in": moment("2017-08-14T19:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-15T02:00:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Dom",
  //         "b_last": "Decicco",
  //         "in": moment("2017-08-14T15:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-14T19:30:00.000Z").format('LLLL')
  //     },
  //     {
  //         "b_first": "Dom",
  //         "b_last": "Decicco",
  //         "in": moment("2017-08-14T20:00:00.000Z").format('LLLL'),
  //         "out": moment("2017-08-15T02:00:00.000Z").format('LLLL')
  //     }
  // ]

  Earnings = [
    {
      'day': 1,
      'harry': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'dom': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'drew': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      }
    },
    {
      'day': 2,
      'harry': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'dom': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'drew': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      }
    },
    {
      'day': 3,
      'harry': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'dom': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'drew': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      }
    },
    {
      'day': 4,
      'harry': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'dom': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      },
      'drew': {
        'total': 450,
        's_com': 135,
        'b_com': 315,
        'tips': 90
      }
    }
  ]

  products = [
    {
      name: 'Monster',
      type: 'Drinks',
      cost: '1.50',
      code: '0012'
    }
  ]

  trans: any
  ngOnInit() {
    console.log('reports loaded')
    this.reportServiceService.getShopTrans({ id:JSON.parse(localStorage.getItem('profile'))[0].shop_id }).subscribe(trans => {
      for (let i = 0; i < trans.length; i++) {
        trans[i].start_time = moment(trans[i].start_time).format('l LT')
      }
      console.log(trans)
      this.report = trans
    })
    this.reportServiceService.getTimecards({ id: JSON.parse(localStorage.getItem('profile'))[0].shop_id }).subscribe(cards => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].time_in = moment(cards[i].time_in).format('LLLL')
        cards[i].time_out = moment(cards[i].time_out).format('LLLL')

      }
      console.log(cards)
      this.timecards = cards
    })
  }

}

// total made , shop commission, barber commision, tips
