import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from '../report-service.service';


@Component({
  selector: 'app-cashoutdialog',
  templateUrl: './cashoutdialog.component.html',
  styleUrls: ['./cashoutdialog.component.css']
})
export class CashoutdialogComponent implements OnInit {

  barbers = JSON.parse(localStorage.getItem('barbers'))

  services = JSON.parse(localStorage.getItem('services'))

  clients = JSON.parse(localStorage.getItem('clients'))

  needToPay = this.service.cashout



constructor(
  public dialogRef: MdDialogRef<CashoutdialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any,
  private service: ReportServiceService
) {
}

ngOnInit() {
  this.service.getInProgress({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
    this.needToPay = data;
    console.log('@db:', data)
  });
  this.needToPay.map(x => x.price = Number (x.price.split('$')[1]))
}

onCloseConfirm(customer, firstname, lastname, phonenumber, email, service, barber, price, tip, amtpaid, typeP, product, bday){

  if(!customer){
    let newClient ={
      'c_first': firstname,
      'c_last': lastname,
      'c_phone': phonenumber,
      'c_email': email,
      'b_day': bday,
      'c_id':'',
      'c_shop': 1
    }
    console.log('-- New Client created --',newClient);

    let customer = firstname + ' ' + lastname;
    let trans = {
      'date': new Date(),
    customer, service, barber, price, tip, amtpaid, typeP, product
    }
    // console.log(trans);
    this.dialogRef.close(trans)
  }
  else{
    let trans = {
      'date': new Date(),
      customer, service, barber, price, tip, amtpaid, typeP, product
    };
    console.log('--- Here is Transaction ---',trans);
    // API CALLL FOR NEW TRANSATION
    // API CALLL FOR NEW TRANSATION
    // API CALLL FOR NEW TRANSATION
    // API CALLL FOR NEW TRANSATION
    // API CALLL FOR NEW TRANSATION
    // API CALLL FOR NEW TRANSATION

    this.dialogRef.close(trans)
  }
}

onCloseCancel(){
  this.dialogRef.close()
}

}
