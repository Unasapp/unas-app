import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from  '../report-service.service'
import * as moment from 'moment'

@Component({
  selector: 'app-custshistorydialog',
  templateUrl: './custshistorydialog.component.html',
  styleUrls: ['./custshistorydialog.component.css']
})
export class CustshistorydialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CustshistorydialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any,
  private service: ReportServiceService) { }

  selectedContact:any;
  history:any;


  ngOnInit() {
    this.selectedContact = this.data
    console.log(this.selectedContact)
    this.service.getHistory(
      {
        cust_id: this.selectedContact.c_id,
        shop_id: JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }).subscribe(data => {
        data.map(x => x.start_time = moment(x.start_time).format('LLLL'))
        console.log(data);

        this.history = data;

      })

  }


  close() {
    this.dialogRef.close()
  }

}
