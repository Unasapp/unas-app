import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-cashoutdialog',
  templateUrl: './cashoutdialog.component.html',
  styleUrls: ['./cashoutdialog.component.css']
})
export class CashoutdialogComponent implements OnInit {

  barbers = [
    {value: 'harry-0', viewValue: 'Harry'},
    {value: 'dominic-1', viewValue: 'Dominic'},
    {value: 'andrew-2', viewValue: 'Andrew'}
  ];

  services = [
    {value: 'haircut-0', viewValue: 'Haircut'},
    {value: 'beardtrim-1', viewValue: 'Beard Trim'},
    {value: 'lineup-2', viewValue: 'Line-up'},
    {value: 'fade-3', viewValue: 'Fade'},
    {value: 'shave-4', viewValue: 'Traditional Shave'}
  ];



constructor(
  public dialogRef: MdDialogRef<CashoutdialogComponent>,
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
