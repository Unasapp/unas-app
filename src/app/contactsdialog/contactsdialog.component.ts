import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from  '../report-service.service'


@Component({
  selector: 'app-contactsdialog',
  templateUrl: './contactsdialog.component.html',
  styleUrls: ['./contactsdialog.component.css']
})
export class ContactsdialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ContactsdialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any, private service: ReportServiceService
  ) { }

  ngOnInit() {

  }

  onCloseConfirm(firstname, lastname, phonenumber, email){

    let newContact = {
      firstname, lastname, phonenumber, email
    };
    this.service.addContact(newContact).subscribe()
    this.dialogRef.close(newContact)
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

}
