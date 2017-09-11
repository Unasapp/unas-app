import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from "ap-angular2-fullcalendar";
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ReportServiceService } from '../report-service.service';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { Options } from 'fullcalendar'
import * as $ from 'jquery';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(public dialog: MdDialog, public reportServiceService: ReportServiceService) { }
    

  @ViewChild('myCalendar') myCalendar: CalendarComponent;

    changeCalendarView(view) {
      this.myCalendar.fullCalendar('changeView', view);
    }

  apptResult: any;
  time = [];

  services = [
    {value: 'Haircut', viewValue: 'Haircut'},
    {value: 'Beard Trim', viewValue: 'Beard Trim'},
    {value: 'Line-up', viewValue: 'Line-up'},
    {value: 'Fade', viewValue: 'Fade'},
    {value: 'Traditional Shave', viewValue: 'Traditional Shave'}
    ];

  barbers = [
    {value: 'Harry Vu', viewValue: 'Harry'},
    {value: 'Dominic DeCicco', viewValue: 'Dominic'},
    {value: 'Andrew Chen', viewValue: 'Andrew'}
  ];


    makeTime() {
        for (var i = 1; i < 13; i++) {
            for (var j = 0; j < 47; j=j+15) {
              if(j===0){
                this.time.push(i+':0'+j)
              }
              else{
                this.time.push(i+':'+j)
              }
            }
          }
      }

  calendarOptions = {
        height: 'parent',
        header: {
            left:  'today prev,next',
            center:   'title',
            right: 'month,agendaWeek,agendaDay,list'
        },
        selectable: true,
        selectHelper: true,
        editable: true,
        events: [
          {
              title  : 'Jime',
              start  : new Date(),
              end    : new Date(),
              color  : 'blue',
              service : 'Hair Cut',
              client : 'Dave Larry'
          },
          {
              title  : 'Jime',
              start  : new Date(),
              end    : new Date(),
              color  : 'blue',
              service : 'Hair Cut',
              client : 'Dave Larry'
          },
          {
              title  : 'Jime',
              start  : new Date(),
              end    : new Date(),
              color  : 'blue',
              service : 'Hair Cut',
              client : 'Dave Larry'
          }
        ],
        eventClick: function(calEvent, jsEvent, view) {
          console.log(calEvent);

                var eTitle = calEvent.title;
                var eStart = moment(calEvent.start).format('LLLL');
                var eEnd = calEvent.end;
                var eClient = calEvent.client;
                var eService = calEvent.service;
                $(".eTitle").html(eTitle);
                $(".eStart").html(eStart);
                $(".eEnd").html(eEnd);
                $(".eClient").html(eClient);
                $(".eService").html(eService);
                $(".eventContent").css('display', 'block');
                // $(".eventContent").css('left', '35%');
                // $(".eventContent").css('top', '5%');
                $(".myModal").css('display', 'block');
                $('.myModal').css('background','rgba(0, 0, 0,0.2)')
        $(this).css('border-color', 'red');
        }

      };



  closeD(){
      $(".eventContent").css('display', 'none');
      $(".myModal").css('display', 'none');
      $('.myModal').css('background','none')
  }


  openEventModal() {
    let dialogRef = this.dialog.open(EventModalComponent,{
      width: '600px',
      data: 'this text is passed'
    })

  }
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
              color  : 'purple',
              service : result.service,
              client : result.customer
          }
        this.calendarOptions.events.push(newappt)
        this.myCalendar.fullCalendar('renderEvent', newappt, true)
      }
      console.log(this.myCalendar);
      this.myCalendar.fullCalendar('refetchEvents');
    })

  }




  ngOnInit() {
    this.makeTime()
  }

}
