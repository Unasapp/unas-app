import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from '../report-service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-walkdialog',
  templateUrl: './walkdialog.component.html',
  styleUrls: ['./walkdialog.component.css']
})
export class WalkdialogComponent implements OnInit {

  barbers = JSON.parse(localStorage.getItem('barbers'))

  services = JSON.parse(localStorage.getItem('services'))

  clients = JSON.parse(localStorage.getItem('clients'))

  constructor(
    public dialogRef: MdDialogRef<WalkdialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private service: ReportServiceService
  ) {
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

  waitlistitem: any;

  onCloseConfirm(customer, firstname, lastname, phonenumber, email, serviceVal, barber, bday, serviceVal1, serviceVal2){

// console.log('fro dialog',customer, firstname, lastname, phonenumber, email, serviceVal, barber, bday, serviceVal1, serviceVal2)
    // multiple services to checkout

      if(!customer && firstname){
        // for new customer
        let newC = {
          'c_first': firstname,
          'c_last': lastname,
          'c_phone': phonenumber,
          'c_email': email,
          'b_day': bday,
          'c_shop': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
          'shop_id': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
          'start_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          'v_id': serviceVal ? serviceVal.v_id : null,
          'b_id': barber,
          'v_id1': serviceVal1 ? serviceVal1.v_id : null,
          'v_id2': serviceVal2 ? serviceVal2.v_id : null
        }
        // console.log('new customer walk in -->',newC);
        this.service.newCustomerWalkin(newC).subscribe(data =>{
          this.waitlistitem = data[0]
          console.log('this.waitlistitem -->>',this.waitlistitem);

          this.dialogRef.close(this.waitlistitem)
        })

      }
      if(customer){
        // existing customer
        // api build and add multi services to appt table
        let trans = {
          'shop_id': JSON.parse(localStorage.getItem('profile'))[0].shop_id,
          'start_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          'v_id': serviceVal ? serviceVal.v_id : null,
          'b_id': barber,
          'c_id': customer,
          'v_id1': serviceVal1 ? serviceVal1.v_id : null,
          'v_id2': serviceVal2 ? serviceVal2.v_id : null
        };
        console.log('Existing customer walk-in ---',trans);
        this.service.walkinTrans(trans).subscribe(data =>{
          this.waitlistitem = data[0]
          console.log('this.waitlistitem -->>',this.waitlistitem);

          this.dialogRef.close(this.waitlistitem)
        })
      }


    }


  ngOnInit() {

  }

}
