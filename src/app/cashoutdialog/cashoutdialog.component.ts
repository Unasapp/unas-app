import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from '../report-service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-cashoutdialog',
  templateUrl: './cashoutdialog.component.html',
  styleUrls: ['./cashoutdialog.component.css']
})
export class CashoutdialogComponent implements OnInit {

  barbers = JSON.parse(localStorage.getItem('barbers'))

  services = JSON.parse(localStorage.getItem('services'))

  clients = JSON.parse(localStorage.getItem('clients'))

  needToPay = []
  tip = 0;
  products: any;
  selected: any;
  productQ = 0;
  chosenproduct: any;
  serviceVal = 0;



constructor(
  public dialogRef: MdDialogRef<CashoutdialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any,
  private service: ReportServiceService
) {

}
 

ngOnInit() {
  console.log('-- this.data ---',this.data);

  if(this.data.a_id){
    this.needToPay.push('nope')
    this.selected = this.data 
    console.log('@db:', this.needToPay)
  }

  else{
    this.service.getInProgress({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
      this.needToPay = data;
      console.log('@db:', data)
      this.needToPay.map(x => x.price = (Number(x.price.split('$')[1])))
      console.log('this.needToPay ----',this.needToPay);
    });
  }

  this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data =>{
    console.log('data -----',data);
    
    this.products = data
    this.products.map(x => x.price = (Number(x.price.split('$')[1])))
    this.products.unshift({
      'product': 'none',
      'price': 0
    })

    console.log('data ----->>>>',this.products);
  })

  this.services.map(x => x.price = (Number(x.price.split('$')[1])))
}

onCloseConfirm(customer, firstname, lastname, phonenumber, email, serviceVal, barber, price, tip, amtpaid, typeP, product, bday){

  if(this.selected){
    let trans = {
      'a_id': this.selected.a_id,
      'tip': this.tip,
      'total': this.selected.price + this.tip + (this.chosenproduct.price * this.productQ),
      'p_id': this.chosenproduct.p_id,
      'quantity': this.productQ,
      'paymth': typeP,
      'status': 'completed'
    }
    // this.service.completeAppt(trans).subscribe()
    this.dialogRef.close()
  }

  if(!customer && !this.selected && firstname){
    let newC = {
      'c_first': firstname,
      'c_last': lastname,
      'c_phone': phonenumber,
      'c_email': email,
      'b_day': bday,
      'c_shop': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
      'shop_id': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
      'start_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      'v_id': serviceVal.v_id,
      'b_id': barber,
      'p_id': this.chosenproduct.p_id,
      'quantity': this.productQ,
      'total': serviceVal.price + this.tip + (this.chosenproduct.price * this.productQ),
      'tip': this.tip,
      'pay_mth': typeP
    }
    // this.service.newCustomerTrans(newC).subscribe()
    this.dialogRef.close()
  }
  if(customer){
    let trans = {
      'shop_id': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
      'start_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      'v_id': serviceVal.v_id,
      'b_id': barber,
      'p_id': this.chosenproduct.p_id,
      'quantity': this.productQ,
      'total': serviceVal.price + this.tip + (this.chosenproduct.price * this.productQ),
      'tip': this.tip,
      'pay_mth': typeP,
      'c_id': customer
    };
    console.log('--- Here is Transaction ---',trans);
    // this.service.walkinTrans(trans).subscribe()
    this.dialogRef.close()
  }

  if(!customer && !firstname && !this.selected){
    let trans = {
      'shop_id': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
      'start_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      'p_id': this.chosenproduct.p_id,
      'quantity': this.productQ,
      'total': this.tip + (this.chosenproduct.price * this.productQ),
      'tip': this.tip,
      'pay_mth': typeP
    };
    console.log('--- Here is Transaction ---',trans);
    // this.service.productTrans(trans).subscribe()
    this.dialogRef.close()

  }

}

onCloseCancel(){
  this.dialogRef.close()
}

}
