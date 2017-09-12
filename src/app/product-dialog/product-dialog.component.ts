import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ProductDialogComponent>, 
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  onCloseConfirm(name, type, cost, code){

    let newproduct = {
      name, type, cost, code
    };

    this.dialogRef.close(newproduct)
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

  ngOnInit() {
  }

}
