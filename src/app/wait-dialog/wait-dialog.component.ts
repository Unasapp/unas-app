import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from '../report-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.css']
})
export class WaitDialogComponent implements OnInit {

  barbers = JSON.parse(localStorage.getItem('barbers'))
  
  services = JSON.parse(localStorage.getItem('services'))
  
  clients = JSON.parse(localStorage.getItem('clients')) 

  constructor(
    public dialogRef: MdDialogRef<WaitDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private service: ReportServiceService
  ) {
  }

  onCloseConfirm(){
    console.log('this.data going to in-progress',this.data);
    this.service.waitToInProgress(this.data).subscribe()
    let gone = [this.data,'progress']
    this.dialogRef.close(gone)
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

  onCloseDelete(){
    this.service.deleteWalkIn(this.data).subscribe()
    let gone = [this.data,'delete']
    this.dialogRef.close(gone)
  }

  ngOnInit() {
    console.log('data coming to wait dialog',this.data);
    
  }

}
