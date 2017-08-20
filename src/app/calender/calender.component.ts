import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  month = moment().format('MMMM')
  year = moment().format("YYYY")
  days = function(op) {
    var prevMonthLength = moment().subtract(1, 'months').daysInMonth();
    var daysArr = [];
    for (let i = 1; i < moment().daysInMonth()+1; i++) {
        daysArr.push(i.toString())
    }
    switch (moment().date(1).format('d')) {
      case '2':
        daysArr.unshift((prevMonthLength).toString());
        break;
      case '3':
        daysArr.unshift((prevMonthLength-1).toString(),prevMonthLength.toString());
        break;
      case '4':
        daysArr.unshift((prevMonthLength-2).toString(),(prevMonthLength-1).toString(),prevMonthLength);
        break;
      case '5':
        daysArr.unshift((prevMonthLength-3).toString(),(prevMonthLength-2).toString(),(prevMonthLength-1).toString(),(prevMonthLength).toString());
        break;
      case '6':
        daysArr.unshift((prevMonthLength-4).toString(),(prevMonthLength-3).toString(),(prevMonthLength-2).toString(),(prevMonthLength-1).toString(),(prevMonthLength).toString());
        break;
      case '0':
        daysArr.unshift((prevMonthLength-5).toString(),(prevMonthLength-4).toString(),(prevMonthLength-3).toString(),(prevMonthLength-2).toString(),(prevMonthLength-1).toString(),(prevMonthLength).toString());
        break;
    }
    var i  = 1;
    while(daysArr.length < 35) {
      daysArr.push(i);
      i++
    }
    return daysArr
  }()

  constructor() { }

  ngOnInit() {
  }

}