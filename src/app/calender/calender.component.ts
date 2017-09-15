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

  constructor(public dialog: MdDialog, public service: ReportServiceService) { }


  @ViewChild('myCalendar') myCalendar: CalendarComponent;

    changeCalendarView(view) {
      this.myCalendar.fullCalendar('changeView', view);
    }

  eID: any;
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
            for (var j = 0; j < 46; j=j+15) {
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
        events: [ ],
        eventClick: function(calEvent, jsEvent, view) {
          console.log(calEvent);
                var eDBid = calEvent.dataID
                var eTitle = calEvent.title;
                var eStart = moment(calEvent.start).format('LLLL');
                var eEnd = calEvent.end; // Not sure if using yet
                var eClient = calEvent.client;
                var eService = calEvent.service;
                var eID = calEvent._id
                $(".eTitle").html(eTitle);
                $(".eStart").html(eStart);
                $(".eClient").html(eClient);
                $(".eService").html(eService);
                $("#eTitle").val(eTitle);
                $("#eStart").val(eStart);
                $("#eClient").val(eClient);
                $("#eService").val(eService);
                $("#eID").val(eID);
                $("#eDBid").val(eDBid);
                $(".eventContent").css('display', 'block');
                $(".myModal").css('display', 'block');
                $('.myModal').css('background','rgba(0, 0, 0,0.2)')
        $(this).css('border-color', 'red');
        },
        eventDestroy: function(calEvent, jsEvent, view) {

        }

      };

  onDeleteEvent(id){
    //API CALL TO DELETE EVENTS
    /////
    console.log('cal ID', $('#eID').val());
    console.log('DB ID', $('#eDBid').val());
    let dataID = $('#eDBid').val();
    this.service.deleteAPPT(dataID)
    this.myCalendar.fullCalendar('removeEvents', $('#eID').val());
    this.closeD()
  }

  onEditEvent(newClient,newservice,newbarber,newdate,timep,timeam){
    //API CALL to Edit EVENTS
    this.myCalendar.fullCalendar('removeEvents', $('#eID').val());
    let editedEvent = {
        ''
        'title': $("#eTitle").val(),
        'start': $("#eStart").val(),
        'end': $("#eStart").val(),
        'color': 'red',
        'client': $("#eClient").val(),
        'service': $("#eService").val(),
    }
    console.log('edited event stuff',newClient,newservice,newbarber,newdate,timep,timeam);
    if(newClient !== undefined){
      editedEvent.client = newClient;
    }
    if(newservice !== undefined){
      editedEvent.service = newservice;
    }
    if(newbarber !== undefined){
      editedEvent.title = newbarber;
    }
    if(newdate !== undefined){
      var timeH = timep.split(':')[0]
      var timeM = timep.split(':')[1]
      timeam === 'pm' ? timeH = Number(timeH) + 12 : timeH = timeH;
      let updatedate =  moment(newdate).hour(timeH).minute(timeM).format("LLLL")
      editedEvent.start = updatedate;
      editedEvent.end = updatedate;
      console.log(new Date());
      console.log(updatedate);
    }


    console.log('cal ID', $('#eID').val());
    console.log('DB ID', $('#eDBid').val());
    let dataID = $('#eDBid').val();

    this.service.editEvent(editedEvent)
        
    this.calendarOptions.events.push(editedEvent)
    this.myCalendar.fullCalendar('renderEvent', editedEvent, true)
    this.closeD()
  }

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
              'dataID' : '',
              title  : result.barber,
              start  : result.date,
              end    : result.date,
              color  : 'purple',
              service : result.service,
              client : result.customer
          }
        this.myCalendar.fullCalendar('renderEvent', newappt, true)
        // API CALL TO ADD EVENTS
        ////
      }
      console.log(this.myCalendar);
      this.myCalendar.fullCalendar('refetchEvents');
    })

  }



appts: any
  ngOnInit() {
    this.makeTime();
    this.service.getAppts({id:1}).subscribe((data)=> {
      data.map(x =>{
      this.calendarOptions.events.push({
              'dataID' : x.a_id,
              'title'  : x.b_first + ' ' + x.b_last,
              'start'  : x.date,
              'end'    : x.date,
              'color'  : x.color,
              'service' : x.service,
              'client' : x.c_first + ' ' + x.c_last
      })
      })
      console.log(data)
    })

  }

}
