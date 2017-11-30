import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from "ap-angular2-fullcalendar";
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ReportServiceService } from '../report-service.service';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { Options } from 'fullcalendar';
import * as $ from 'jquery';
import { FilterPipe } from '../filter.pipe';
import { Router } from '@angular/router';
import { WalkdialogComponent } from '../walkdialog/walkdialog.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(
    public myService: ReportServiceService,
    public dialog: MdDialog,
    public service: ReportServiceService, public router: Router
  ) {

  }


  @ViewChild('myCalendar') myCalendar: CalendarComponent;

    changeCalendarView(view) {
      this.myCalendar.fullCalendar('changeView', view);
    }

  eID: any;
  apptResult: any;
  time = [];

  barbers = JSON.parse(localStorage.getItem('barbers'))
  public users = JSON.parse(localStorage.getItem('clients'))
  services = JSON.parse(localStorage.getItem('services'))

  profType:boolean;

  logout() {
    let user = JSON.parse(localStorage.getItem('profile'))[0]
    if (user.type === 'user') {
        let timecard = {
          userId: user.id,
          timeIn: user.timeIn,
          timeOut: moment(new Date()).format('YYYY-MM-DD HH:mm:ss z'),
          shopId: user.shop_id
        }
        console.log(timecard)
        this.service.clockOut(timecard).subscribe()
    }

    localStorage.removeItem('profile');
    localStorage.removeItem('barbers');
    localStorage.removeItem('clients');
    localStorage.removeItem('services');
    this.router.navigate(['/login'])
  }

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
        events: [ ],
        eventClick: function(calEvent, jsEvent, view) {
          console.log(calEvent);
                var apptDB_id = calEvent.dataID
                var eTitle = calEvent.title;
                var eStart = moment(calEvent.start).format('LLLL');
                var eEnd = calEvent.end; // Not sure if using yet
                var eClient = calEvent.client;
                var eService = calEvent.service;
                var eCal_ID = calEvent._id
                var shop_id = calEvent.shop_id
                $(".eTitle").html(eTitle);
                $(".eStart").html(eStart);
                $(".eClient").html(eClient);
                $(".eService").html(eService);
                $("#eTitle").val(eTitle);
                $("#eStart").val(eStart);
                $("#eClient").val(eClient);
                $("#eService").val(eService);
                $("#eCal_ID").val(eCal_ID);
                $("#apptDB_id").val(apptDB_id);
                $('#shop_id').val(shop_id)
                $(".eventContent").css('display', 'block');
                $(".myModal").css('display', 'block');
                $('.myModal').css('background','rgba(0, 0, 0,0.2)')
        $(this).css('border-color', 'red');
        },
        eventDestroy: function(calEvent, jsEvent, view) {

        }

      };

  onDeleteEvent(id){
    console.log('cal ID', $('#eCal_ID').val());
    console.log('DB ID', $('#apptDB_id').val());
    console.log('Shop ID', $('#shop_id').val());
    let deleteIDs = {
      'a_id': Number($('#apptDB_id').val()),
      'shop_id': Number($('#shop_id').val())
    }
    console.log('-- deleteIDs in cal comp --', deleteIDs);
    ///// API CALL TO DELETE EVENTS
    /////
    this.service.deleteAPPT(deleteIDs).subscribe()
    //////////
    this.myCalendar.fullCalendar('removeEvents', $('#eCal_ID').val());
    this.closeD()
  }

  onEditEvent(newClient,newservice,newbarber,newdate,timep,timeam){
    //API CALL to Edit EVENTS
    this.myCalendar.fullCalendar('removeEvents', $('#eCal_ID').val());
    let editedEvent = {
        'dataID' : Number($('#apptDB_id').val()),
        'title': $("#eTitle").val(),
        'start': $("#eStart").val(),
        'end': $("#eStart").val(),
        'color': 'red',
        'client': $("#eClient").val(),
        'service': $("#eService").val(),
        'shop_id': Number($('#shop_id').val())
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
      console.log(updatedate);
    }

    console.log('-- new Appt data --',editedEvent);


    this.service.editAppt(editedEvent).subscribe()

    this.calendarOptions.events.push(editedEvent)
    this.myCalendar.fullCalendar('renderEvent', editedEvent, true)
    this.closeD()
  }

  closeD(){
      $(".eventContent").css('display', 'none');
      $(".myModal").css('display', 'none');
      $('.myModal').css('background','none')
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
              client : result.customer,
              'shop_id': 1
          }
        this.myCalendar.fullCalendar('renderEvent', newappt, true)
      }
      console.log(this.myCalendar);
      this.myCalendar.fullCalendar('refetchEvents');
    })

  }



appts: any
  ngOnInit() {
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    console.log('-- users from storage ---',this.users);
    console.log('-- barbers from storage ---',this.barbers);
    console.log('-- services from storage ---',this.services);

    this.makeTime();
    this.service.getAppts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe((data)=> {
      data.map(x =>{
        let newappt = {
          'dataID' : x.a_id,
          'title'  : x.b_first + ' ' + x.b_last,
          'start'  : x.start_time,
          'end'    : x.end_time,
          'color'  : x.color,
          'service' : x.service,
          'client' : x.c_first + ' ' + x.c_last,
          'shop_id': x.shop
      }
      this.calendarOptions.events.push(newappt)
      this.myCalendar.fullCalendar('renderEvent', newappt, true)
      })
      console.log('data from get appts',data)
    })

  }

  openWalkDialog() {
    let dialogRef = this.dialog.open(WalkdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }

}
