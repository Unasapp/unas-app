import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../report-service.service'
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { WalkdialogComponent } from '../walkdialog/walkdialog.component';
import { WaitDialogComponent } from '../wait-dialog/wait-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  constructor(
    public service: ReportServiceService,
    public dialog: MdDialog,
    public router: Router
  ) { }

  profType:boolean;
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('barbers');
    localStorage.removeItem('clients');
    localStorage.removeItem('services');
    this.router.navigate(['/login'])
  }

  needToPay: any;
  waitList: any;

  openCashDialog() {
    let dialogRef = this.dialog.open(CashoutdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }

  openWalkDialog() {
    let dialogRef = this.dialog.open(WalkdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
          if(result.service_id != null){
            for (var i = 0; i < this.services.length; i++) {
              if(this.services[i].v_id == result.service_id){
                result.service = this.services[i].service
                result.price = this.services[i].price
              }
            }
          }
          if(result.barber_id != null){
            for (var i = 0; i < this.barbers.length; i++) {
              if(this.barbers[i].b_id == result.barber_id){
                result.b_first = this.barbers[i].b_first
                result.b_last = this.barbers[i].b_last
              }
            }
          }
          if(result.client_id != null){
            for (var i = 0; i < this.clients.length; i++) {
              if(this.clients[i].c_id == result.client_id){
                result.c_first = this.clients[i].c_first
                result.c_last = this.clients[i].c_last
              }
            }
          }
          if(result.service_id2 != null){
            for (var i = 0; i < this.services.length; i++) {
              if(this.services[i].v_id == result.service_id2){
                result.service2 = this.services[i].service
                result.service2price = this.services[i].price
              }
            }
          }
          if(result.service_id3 != null){
            for (var j = 0; j < this.services.length; j++) {
              if(this.services[j].v_id == result.service_id3){
                result.service3 = this.services[j].service
                result.service3price = this.services[j].price
              }
            }
          }

        this.waitList.push(result)
      }
    })
  }

  openApptDialog() {
    let dialogRef = this.dialog.open(ApptdialogComponent, {
      width: '600px',
      data: 'this text is passed'
    })
  }

  openCashOut(appt){
    let dialogRef = this.dialog.open(CashoutdialogComponent, {
      width: '600px',
      data: appt
    })
  }

  openWaitDialog(walk){
    let dialogRef = this.dialog.open(WaitDialogComponent, {
      width: '600px',
      data: walk
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result[1]=='progress'){
        for (var i = 0; i < this.waitList.length; i++) {
          if(this.waitList[i].a_id == result[0].a_id ){
            this.waitList.splice(i,1)
          }
        }
        this.needToPay.push(result[0])
      }
      if(result[1]=='delete'){
        for (var i = 0; i < this.waitList.length; i++) {
          if(this.waitList[i].a_id == result[0].a_id ){
            this.waitList.splice(i,1)
          }
        }
      }
    })
  }

  barbers = JSON.parse(localStorage.getItem('barbers'))
  
  services = JSON.parse(localStorage.getItem('services'))
  
  clients = JSON.parse(localStorage.getItem('clients')) 

  ngOnInit() {
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    
    this.service.getInProgress({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
      this.needToPay = data;
      console.log('@db:', data)
      this.needToPay.map(x => x.price = (Number(x.price.split('$')[1])))
      console.log('this.needToPay ----',this.needToPay);
    });

    this.service.getInWaitList({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data => {
      console.log('wait list data',data);
      console.log('-- this.services --',this.services);
      
      this.waitList = data;
      this.waitList.map((x)=>{
        if(x.service_id2 != null){
          for (var i = 0; i < this.services.length; i++) {
            if(this.services[i].v_id == x.service_id2){
              x.service2 = this.services[i].service
              x.service2price = this.services[i].price
            }
          }
        }
        if(x.service_id3 != null){
          for (var j = 0; j < this.services.length; j++) {
            if(this.services[j].v_id == x.service_id3){
              x.service3 = this.services[j].service
              x.service3price = this.services[j].price
            }
          }
        }

      })
      console.log('this.waitList --->>',this.waitList);

    });



  }

}
