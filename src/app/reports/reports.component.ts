import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

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

      report = [
        {
            "b_first": "Andrew",
            "b_last": "Chen",
            "c_first": "David",
            "c_last": "Lee",
            "service": "Beard Trim",
            "date": "2017-08-13",
            "price": "$5.00",
            "tip": "$3.00",
            "total": "$8.00"
        },
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "c_first": "John ",
            "c_last": "Smith",
            "service": "Haircut",
            "date": "2017-08-13",
            "price": "$20.00",
            "tip": "$5.00",
            "total": "$25.00"
        },
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "c_first": "Lesley",
            "c_last": "Rico",
            "service": "Shave",
            "date": "2017-08-13",
            "price": "$15.00",
            "tip": "$5.00",
            "total": "$20.00"
        },
        {
            "b_first": "Dom",
            "b_last": "Decicco",
            "c_first": "Brittany",
            "c_last": "Jensen",
            "service": "Haircut",
            "date": "2017-08-13",
            "price": "$20.00",
            "tip": "$10.00",
            "total": "$30.00"
        },
        {
            "b_first": "Andrew",
            "b_last": "Chen",
            "c_first": "Carlos",
            "c_last": "Jimenez",
            "service": "Line Up",
            "date": "2017-08-13",
            "price": "$10.00",
            "tip": "$5.00",
            "total": "$15.00"
        },
        {
            "b_first": "Dom",
            "b_last": "Decicco",
            "c_first": "John ",
            "c_last": "Smith",
            "service": "Shave",
            "date": "2017-08-13",
            "price": "$15.00",
            "tip": "$5.00",
            "total": "$20.00"
        },
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "c_first": "Lesley",
            "c_last": "Rico",
            "service": "Beard Trim",
            "date": "2017-08-13",
            "price": "$5.00",
            "tip": "$2.00",
            "total": "$7.00"
        }
    ]

    timecards = [
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "in": moment("2017-08-13T15:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-13T18:30:00.000Z").format('LLLL')
        },
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "in": moment("2017-08-13T19:30:00.000Z").format('LLLL'),
            "out": moment("2017-08-14T02:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Andrew",
            "b_last": "Chen",
            "in": moment("2017-08-13T15:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-13T18:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Andrew",
            "b_last": "Chen",
            "in": moment("2017-08-13T18:30:00.000Z").format('LLLL'),
            "out": moment("2017-08-14T02:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Dom",
            "b_last": "Decicco",
            "in": moment("2017-08-13T15:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-13T19:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Dom",
            "b_last": "Decicco",
            "in": moment("2017-08-13T20:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-14T02:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "in": moment("2017-08-14T15:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-14T19:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Harry",
            "b_last": "Vu",
            "in": moment("2017-08-14T20:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-15T02:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Andrew",
            "b_last": "Chen",
            "in": moment("2017-08-14T15:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-14T18:30:00.000Z").format('LLLL')
        },
        {
            "b_first": "Andrew",
            "b_last": "Chen",
            "in": moment("2017-08-14T19:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-15T02:00:00.000Z").format('LLLL')
        },
        {
            "b_first": "Dom",
            "b_last": "Decicco",
            "in": moment("2017-08-14T15:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-14T19:30:00.000Z").format('LLLL')
        },
        {
            "b_first": "Dom",
            "b_last": "Decicco",
            "in": moment("2017-08-14T20:00:00.000Z").format('LLLL'),
            "out": moment("2017-08-15T02:00:00.000Z").format('LLLL')
        }
    ]

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

  ngOnInit() {
  }

}

// total made , shop commission, barber commision, tips