import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { BarberModalComponent } from '../barber-modal/barber-modal.component'
import { ReportServiceService } from '../report-service.service';


@Component({
  selector: 'app-allbarbers',
  templateUrl: './allbarbers.component.html',
  styleUrls: ['./allbarbers.component.css']
})
export class AllbarbersComponent implements OnInit {

  barbers: any;
  ifopen: true;

  constructor(private http: HttpClient, public dialog: MdDialog) { }

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
  openBarberModal(selectedBarber) {
    let dialogRef = this.dialog.open(BarberModalComponent, {
      width: '600px',
      data: selectedBarber
    })
  }





  ngOnInit() {

     this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
        this.barbers = data;
        console.log('users',this.barbers);
    });
  }

}
