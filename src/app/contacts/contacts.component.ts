import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ContactsdialogComponent } from '../contactsdialog/contactsdialog.component'
import { FilterPipe } from '../filter.pipe'
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ReportServiceService } from  '../report-service.service'


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  name: any;
  ifopen: true;
  public users = []
  dialogResult: any;
  deleted: any;
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

  openDialog(selectedContact) {
    let dialogRef = this.dialog.open(ContactsdialogComponent,{
      width: '600px',
      data: selectedContact ? selectedContact : { new: true },
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result.status === "added"){
        this.users.push(result);
      } else if (result.status === "edited") {
        this.users[this.users.findIndex((x)=> x.c_id === result.c_id)] = result
      } else if (result.status === "deleted") {
        this.users.splice(this.users.findIndex(x => x.c_id === result.c_id),1)
      } else if (result.status === "canceled") {
      } else {
        alert('An error occurred')
      }
    })

  }


  ngOnInit() {
     this.service.getContacts({id:1}).subscribe((data) => {
        this.users = data;
    });
  }

}
