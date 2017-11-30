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
  chosenproduct2: any;
  serviceVal1: any;
  serviceVal2: any;



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
  console.log('-- this.data ---', this.data);

  if(this.data.a_id) {
    this.selected = this.data
    this.needToPay.push('nope')
    if(this.selected.service_id2){
      this.services.map(x => {
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

  else {
    this.service.getInProgress({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
      this.needToPay = data;
      this.needToPay.map(x => x.price = (Number(x.price.split('$')[1])))
      this.services.unshift({
        'service': "None",
        "price": 0
      })
      console.log('this.needToPay ----',this.needToPay);
    });
  }

  this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data =>{
    this.products = data
    this.products.map(x => x.price = (Number(x.price.split('$')[1])))
    this.products.unshift({
      'product': 'none',
      'price': null
    })
    console.log('data for products ----->>>>',this.products);
  })

}

onCloseConfirm(tip, typeP){

  console.log('cashed out',this.selected);

  if(this.selected){
    let trans = {
      'a_id': this.selected.a_id,
      'tip': this.tip,
      'total': this.selected.price + (this.selected.serviceP2 ? this.selected.serviceP2 : 0) + (this.selected.serviceP3 ? this.selected.serviceP3 : 0) + (this.serviceVal1 ? this.serviceVal1.price : 0) + (this.serviceVal2 ? this.serviceVal2.price : 0) + this.tip + ((this.chosenproduct ? this.chosenproduct.price : 0)  * this.productQ) + ((this.chosenproduct2 ? this.chosenproduct2.price : 0) * this.productQ2),
      'v_id2': this.selected.service_id2 ? this.selected.service_id2 : null,
      'v_id3': this.selected.service_id3 ? this.selected.service_id3 : null,
      'v_id4': this.serviceVal1 ? this.serviceVal1.v_id : null,
      'v_id5': this.serviceVal2 ? this.serviceVal2.v_id : null,
      'p_id': this.chosenproduct ? this.chosenproduct.p_id : null,
      'quantity': this.productQ,
      'p_id2': this.chosenproduct2 ? this.chosenproduct2.p_id : null,
      'quantity2': this.productQ2,
      'paymth': typeP ? typeP : null,
      'status': 'completed'
    }
    console.log('cashed out OBJ',trans);

    this.service.completeAppt(trans).subscribe()
    this.dialogRef.close(this.selected.a_id)
  }

}

onCloseCancel(){
  this.dialogRef.close()
}

}
