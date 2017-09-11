import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from "ap-angular2-fullcalendar";
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { Options } from 'fullcalendar'
import * as $ from 'jquery';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @ViewChild('myCalendar') myCalendar: CalendarComponent;

    changeCalendarView(view) {
      this.myCalendar.fullCalendar('changeView', view);
    }

  apptResult: any;

  calendarOptions = {
        height: 'parent',
        header: {
            left:  'today prev,next',
            center:   'title',
            right: 'month,agendaWeek,agendaDay,list'
        },
        selectable: true,
        editable: true,
        events: [
          {
              title  : 'Hair Cut',
              start  : new Date(),
              end    : new Date(),
              color  : 'blue'
          },
          {
              title  : 'Beared Shave',
              start  : new Date(),
              end    : new Date(),
              color  : 'red'
          },
          {
              title  : 'Hair Cut',
              start  : new Date(),
              end    : new Date(),
              color  : 'green'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 24 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 24 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'green'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 16 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 16 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'red'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 16 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 16 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'blue'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 16 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 16 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'grey'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 8 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 8 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'green'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 3 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 3 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'red'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 18 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 18 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'blue'
          },
          {
              title  : 'Hair Cut',
              start  : 'Sun Aug 22 2017 21:59:49 GMT-0600 (MDT)',
              end    : 'Sun Aug 22 2017 21:59:49 GMT-0600 (MDT)',
              color  : 'grey'
          }
        ],
        eventClick: function(calEvent, jsEvent, view) {
        alert('Event: ' + calEvent.title);
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        alert('View: ' + view.name);
        // change the border color just for fun
        $(this).css('border-color', 'red');

    }


      };


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
      dialogRef.afterClosed().subscribe(result =>{
      this.apptResult = result;

      if(result !== undefined){
      let newappt =  {
              title  : result.barber,
              start  : result.date,
              end    : result.date,
              color  : 'purple'
          }
        this.calendarOptions.events.push(newappt)
        this.myCalendar.fullCalendar('renderEvent', newappt, true)
      }
      console.log(this.myCalendar);
      this.myCalendar.fullCalendar('refetchEvents');
    })

  }




  ngOnInit() {

  }

}

//weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // month = moment().format('MMMM')
  // year = moment().format("YYYY")
  // days = function(op) {
  //   var prevMonthLength = moment().subtract(1, 'months').daysInMonth();
  //   var daysArr = [];
  //   for (let i = 1; i < moment().daysInMonth()+1; i++) {
  //       daysArr.push(i.toString())
  //   }
  //   switch (moment().date(1).format('d')) {
  //     case '2':
  //       daysArr.unshift((prevMonthLength).toString());
  //       break;
  //     case '3':
  //       daysArr.unshift((prevMonthLength-1).toString(),prevMonthLength.toString());
  //       break;
  //     case '4':
  //       daysArr.unshift((prevMonthLength-2).toString(),(prevMonthLength-1).toString(),prevMonthLength);
  //       break;
  //     case '5':
  //       daysArr.unshift((prevMonthLength-3).toString(),(prevMonthLength-2).toString(),(prevMonthLength-1).toString(),(prevMonthLength).toString());
  //       break;
  //     case '6':
  //       daysArr.unshift((prevMonthLength-4).toString(),(prevMonthLength-3).toString(),(prevMonthLength-2).toString(),(prevMonthLength-1).toString(),(prevMonthLength).toString());
  //       break;
  //     case '0':
  //       daysArr.unshift((prevMonthLength-5).toString(),(prevMonthLength-4).toString(),(prevMonthLength-3).toString(),(prevMonthLength-2).toString(),(prevMonthLength-1).toString(),(prevMonthLength).toString());
  //       break;
  //   }
  //   var i  = 1;
  //   while(daysArr.length < 35) {
  //     daysArr.push(i);
  //     i++
  //   }
  //   return daysArr
  // }()
