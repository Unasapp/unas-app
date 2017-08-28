import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MdDatepickerModule } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-apptdialog',
  templateUrl: './apptdialog.component.html',
  styleUrls: ['./apptdialog.component.css']
})
export class ApptdialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ApptdialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onCloseConfirm(firstname, lastname, phonenumber, email){

    let newcontact = {
      firstname, lastname, phonenumber, email
    };

    this.dialogRef.close(newcontact)
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

}
