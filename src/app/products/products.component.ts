import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CashoutdialogComponent } from '../cashoutdialog/cashoutdialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ApptdialogComponent } from '../apptdialog/apptdialog.component';
import { ReportServiceService } from  '../report-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any

  constructor(private http: HttpClient, public dialog: MdDialog, private service: ReportServiceService, public router: Router) { }

  profType:boolean;
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('barbers');
    localStorage.removeItem('clients');
    localStorage.removeItem('services');
    this.router.navigate(['/login'])
  }

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
  
    openDialog(x) {
      let dialogRef = this.dialog.open(ProductDialogComponent,{
        width: '600px',
        data: x
      })
  
      dialogRef.afterClosed().subscribe(result =>{
        if(result.p_id){
          for (var i = 0; i < this.products.length; i++) {
            if(this.products[i].p_id == result.p_id){
              this.products[i] = result
            }
          }
        }
        if(result.delete){
          for (var i = 0; i < this.products.length; i++) {
            if(this.products[i].p_id == result.p_id){
              this.products.splice(i,1)
            }
          }
        }
        if(!result.p_id){
          this.products.push(result)
        }
      })
  
    }

  ngOnInit() {
    this.profType = (JSON.parse(localStorage.getItem('profile'))[0].type === 'admin') ? true : false
    this.service.getProducts({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe(data =>{
      this.products = data
    })

  }

}
