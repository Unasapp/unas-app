import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ServicesDialogComponent } from '../services-dialog/services-dialog.component'
import { ReportServiceService } from  '../report-service.service'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  public services = [];



  constructor(private http: HttpClient, public dialog: MdDialog, private service: ReportServiceService) { }

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

  openServicesDialog(selectedService) {
    let dialogRef = this.dialog.open(ServicesDialogComponent,{
      width: '600px',
      data: selectedService ? selectedService : { new: true },
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result.status === "added"){
        this.services.push(result);
      } else if (result.status === "edited") {
        this.services[this.services.findIndex((x)=> x.v_id === result.v_id)] = result
      } else if (result.status === "deleted") {
        this.services.splice(this.services.findIndex(x => x.v_id === result.v_id),1)
      } else if (result.status === "canceled") {
      } else {
        alert('An error occurred')
      }
    })

  }



  ngOnInit() {
    this.service.getServices({id:1}).subscribe((data) => {
       this.services = data;
       console.log(this.services);
   });
  }

}
