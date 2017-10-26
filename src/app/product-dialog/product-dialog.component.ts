import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from  '../report-service.service'

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ProductDialogComponent>, 
    @Inject(MD_DIALOG_DATA) public data: any,
    public service: ReportServiceService
  ) { }

  onCloseConfirm(para){
    
    if(para == 'ADD'){
      // add new product call
      let product = {
        'product': this.productname,
        'price': this.productcost, 
        'type': this.producttype,
        'quantity': this.productquantity,
        'shop_id': JSON.parse(localStorage.getItem('profile'))[0].shop_id
      }
      this.service.addNewProduct(product).subscribe()
      this.dialogRef.close(product)
    }
    if(para == 'SAVE'){
      // edit new product call
      let product = {
        'product': this.productname,
        'price': this.productcost, 
        'type': this.producttype,
        'quantity': this.productquantity,
        'p_id': this.p_id,
        'shop_id': this.shop_id
      }
      this.service.editProduct(product).subscribe()
      this.dialogRef.close(product)
    }
    if(para == 'DELETE'){
      // delete product call
      let product = {
        'product': this.productname,
        'price': this.productcost, 
        'type': this.producttype,
        'quantity': this.productquantity,
        'p_id': this.p_id,
        'shop_id': this.shop_id,
        'delete': true
      }
      this.service.deleteProduct(product).subscribe()
      this.dialogRef.close(product)
    }
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

  productcost: any
  productname: any 
  producttype: any 
  productquantity: any
  shop_id: any
  p_id: any

  ngOnInit() {
    console.log('this is data coming in',this.data);
    if(this.data !== "no"){
      this.shop_id = this.data.shop_id
      this.p_id = this.data.p_id
      this.productcost = this.data.price
      this.productname = this.data.product
      this.producttype = this.data.type
      this.productquantity = this.data.quantity
      this.data = "yes"
    }
    
     
  }

}
