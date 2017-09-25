import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MdDatepickerModule } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { ReportServiceService } from '../report-service.service';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';


@Component({
  selector: 'app-apptdialog',
  templateUrl: './apptdialog.component.html',
  styleUrls: ['./apptdialog.component.css']
})
export class ApptdialogComponent implements OnInit {
  time = [];
  clients: any;
  barbers: any;
  services: any;

  constructor(
    private myService: ReportServiceService,
    public dialogRef: MdDialogRef<ApptdialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    public http: Http
  ) { }

  makeTime(){
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


  ngOnInit() {
    this.barbers = JSON.parse(localStorage.getItem('barbers'))
    this.clients = JSON.parse(localStorage.getItem('clients'))
    this.services = JSON.parse(localStorage.getItem('services'))
    console.log(this.barbers);
    console.log(this.clients);
    console.log(this.services);
    this.makeTime()
  }

  onCloseConfirm(barber, service, customer, date, timep, timeam, firstname, lastname, phonenumber, email){
    var timeH = timep.split(':')[0]
    var timeM = timep.split(':')[1]
    timeam === 'pm' ? timeH = Number(timeH) + 12 : timeH = timeH;

    console.log('data coming from closing Appt dialog',barber, service, customer, date, timep, timeam, firstname, lastname, phonenumber, email);
    
    let newappt =  {
        'barber_id'  : barber.b_id,
        'client_id'  : customer.c_id,
        'service_id'  : service.v_id,
        'shop_id'  : service.shop_id,
        'start_time' : moment(date).hour(timeH).minute(timeM).format('YYYY-MM-DD HH:mm:ss'),
        'end_time' : moment(date).hour(timeH).minute(timeM).format('YYYY-MM-DD HH:mm:ss')
    }
    
    console.log('Appt going to DB',newappt);
    // API call to add appt to DB
    // API call to add appt to DB
    // API call to add appt to DB
    this.myService.addAppts(newappt).subscribe()

    if(!customer){
      /// New Customer Call 
      let customer = firstname + ' ' + lastname;
      let newappt = {
        'barber': barber.b_first + ' ' + barber.b_last,
        'service': service.service, 
        'customer': customer, 
        'date': moment(date).hour(timeH).minute(timeM).format('LLLL')
      };
      console.log('appt to DOM',newappt);
      this.dialogRef.close(newappt)
    } else{
      let newappt = {
        'barber': barber.b_first + ' ' + barber.b_last,
        'service': service.service, 
        'customer': customer.c_first + ' ' + customer.c_last , 
        'date': moment(date).hour(timeH).minute(timeM).format('LLLL')
      };
      console.log('appt to DOM',newappt);
      this.dialogRef.close(newappt)
    }       
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

}
