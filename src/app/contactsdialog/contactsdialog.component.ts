import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-contactsdialog',
  templateUrl: './contactsdialog.component.html',
  styleUrls: ['./contactsdialog.component.css']
})
export class ContactsdialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ContactsdialogComponent>, 
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
