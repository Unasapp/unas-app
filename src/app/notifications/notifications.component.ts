import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ReportServiceService } from '../report-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  test: any = [];
  ifopen: true;
  pusher: any;
  deleteRequests:any;

  constructor(public dialog: MdDialog, public service: ReportServiceService, public router: Router) { }

  profType:boolean;
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('barbers');
    localStorage.removeItem('clients');
    localStorage.removeItem('services');
    this.router.navigate(['/login'])
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
  }

  ngOnInit() {
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    this.service.getDeleteRequests({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
      this.deleteRequests = data;
    })
  }


}
