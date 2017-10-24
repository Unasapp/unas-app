import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ReportServiceService } from  '../report-service.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any

  constructor(private http: HttpClient, public dialog: MdDialog, private service: ReportServiceService) { }
  
    openCashDialog() {
      let dialogRef = this.dialog.open(CashoutdialogComponent,{
        width: '600px',
        data: 'this text is passed'
      })
    }
    openApptDialog() {
      let dialogRef = this.dialog.open(ApptdialogComponent,{
        width: '600px',
        data: 'this text is passed'
      })
    }
  
    openDialog(selectedContact) {
      let dialogRef = this.dialog.open(ProductDialogComponent,{
        width: '600px',
        data: selectedContact ? selectedContact : { new: true },
      })
  
      // dialogRef.afterClosed().subscribe(result =>{
      //   if(result.status === "added"){
      //     this.users.push(result);
      //   } else if (result.status === "edited") {
      //     this.users[this.users.findIndex((x)=> x.c_id === result.c_id)] = result
      //   } else if (result.status === "deleted") {
      //     this.users.splice(this.users.findIndex(x => x.c_id === result.c_id),1)
      //   } else if (result.status === "canceled") {
      //   } else {
      //     alert('An error occurred')
      //   }
      // })
  
    }

  ngOnInit() {
    
    this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data =>{
      this.products = data
    })

  }

}
