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
    {value: 'Harry Vu', viewValue: 'Harry'},
    {value: 'Dominic DeCicco', viewValue: 'Dominic'},
    {value: 'Andrew Chen', viewValue: 'Andrew'}
  ];

  services = [
    {value: 'haircut', viewValue: 'Haircut'},
    {value: 'beardtrim', viewValue: 'Beard Trim'},
    {value: 'lineup', viewValue: 'Line-up'},
    {value: 'fade', viewValue: 'Fade'},
    {value: 'shave', viewValue: 'Traditional Shave'}
  ];

  clients = [
    {value: 'Lesley Rico', viewValue: 'Lesley Rico'},
    {value: 'Bittany Jensen', viewValue: 'Bittany Jensen'},
    {value: 'Carlo Jimenez', viewValue: 'Carlo Jimenez'},
    {value: 'Mike Hunt', viewValue: 'Mike Hunt'},
    {value: 'Kwatasha Smith', viewValue: 'Kwatasha Smith'}
  ];



constructor(
  public dialogRef: MdDialogRef<CashoutdialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any
) { }

ngOnInit() {
}

onCloseConfirm(customer, firstname, lastname, phonenumber, email, service, barber, price, tip, amtpaid, typeP){

  if(!customer){
    let customer = firstname + ' ' + lastname;
    let trans = {
      'date': new Date(),
    customer, service, barber, price, tip, amtpaid, typeP
    }
    // console.log(trans);
    this.dialogRef.close(trans)
  }
  else{
    let trans = {
      'date': new Date(),
      customer, service, barber, price, tip, amtpaid, typeP
    };
    // console.log(trans);
    this.dialogRef.close(trans)
  }
}

onCloseCancel(){
  this.dialogRef.close()
}

}
