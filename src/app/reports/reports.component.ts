import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ReportServiceService } from '../report-service.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  cashResult: any;

  constructor(public dialog: MdDialog,  public reportServiceService: ReportServiceService) { }

  openCashDialog() {
    let dialogRef = this.dialog.open(CashoutdialogComponent,{
      width: '600px',
      data: 'this text is passed'
    })
      dialogRef.afterClosed().subscribe(result =>{
      this.cashResult = result;
      // console.log(result);

      if(result !== undefined){
      let newreport =  {
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
    let dialogRef = this.dialog.open(ApptdialogComponent,{
      width: '600px',
      data: 'this text is passed'
    })
  }

    report:any = []

    timecards:any = []
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
            'tips':  90
          },
          'dom' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'drew' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          }
        },
        {
          'day': 2,
          'harry': {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'dom' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'drew' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          }
        },
        {
          'day': 3,
          'harry': {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'dom' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'drew' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          }
        },
        {
          'day': 4,
          'harry': {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'dom' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          },
          'drew' : {
            'total': 450,
            's_com': 135,
            'b_com': 315,
            'tips':  90
          }
        }
    ]
    trans: any
  ngOnInit() {
    console.log('reports loaded')
    this.reportServiceService.getShopTrans({id:1}).subscribe(trans => {
      for (let i = 0; i < trans.length; i++) {
          trans[i].date = moment(trans[i].date).format('M-D-YY')
      }
      console.log(trans)
      this.report = trans
    })
    this.reportServiceService.getTimecards({id:1}).subscribe(cards => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].in = moment(cards[i].in).format('LLLL')
        cards[i].out = moment(cards[i].out).format('LLLL')

      }
      console.log(cards)
      this.timecards = cards
    })
  }

}

// total made , shop commission, barber commision, tips
