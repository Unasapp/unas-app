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
  productQ2 = 0;
  chosenproduct: any;
  serviceVal = 0;



constructor(
  public dialogRef: MdDialogRef<CashoutdialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any,
  private service: ReportServiceService
) {

}

apptSelected(appt){

  if(appt.a_id){
    this.selected = appt 
    this.needToPay.push('nope')
    if(this.selected.service_id2){
      this.services.map(x=>{
        if(x.v_id == this.selected.service_id2){
          this.selected.service2 = x.service
          this.selected.serviceP2 = x.price
        }
      })
    }

    if(this.selected.service_id3){
      this.services.map(x=>{
        if(x.v_id == this.selected.service_id2){
          this.selected.service3 = x.service
          this.selected.serviceP3 = x.price
        }
      })
    }

  }

}
 

ngOnInit() {
  this.services.map(x => x.price = (Number(x.price.split('$')[1])))
  console.log('-- this.data ---',this.data);

  if(this.data.a_id){
    this.selected = this.data 
    this.needToPay.push('nope')
    if(this.selected.service_id2){
      this.services.map(x=>{
        if(x.v_id == this.selected.service_id2){
          this.selected.service2 = x.service
          this.selected.serviceP2 = x.price
        }
      })
    }
    if(this.selected.service_id3){
      this.services.map(x=>{
        if(x.v_id == this.selected.service_id2){
          this.selected.service3 = x.service
          this.selected.serviceP3 = x.price
        }
      })
    }
    
  }

  else{
    this.service.getInProgress({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
      this.needToPay = data;
      this.needToPay.map(x => x.price = (Number(x.price.split('$')[1])))
      console.log('this.needToPay ----',this.needToPay);
    });
  }

  this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data =>{
    this.products = data
    this.products.map(x => x.price = (Number(x.price.split('$')[1])))
    this.products.unshift({
      'product': 'none',
      'price': 0
    })
    console.log('data for products ----->>>>',this.products);
  })
  
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
