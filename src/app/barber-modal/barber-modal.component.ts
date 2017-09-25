import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-barber-modal',
  templateUrl: './barber-modal.component.html',
  styleUrls: ['./barber-modal.component.css']
})
export class BarberModalComponent implements OnInit {

  pay: string;
  selectedBarber: any;
  payType: any;
  rent: any;
  per: any;
  hourly: any;
  commission: any;
  

  constructor(
    public dialogRef: MdDialogRef<BarberModalComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {

   }

   save(){
    if(this.payType == 'Hourly'){
      console.log('Hourly Changed',this.hourly);
      this.selectedBarber.type = 'hourly'
      this.selectedBarber.rate = this.hourly + '/hr'
    }
    else if(this.payType == 'Commission'){
      console.log('Commsision Changes',this.commission);
      this.selectedBarber.type = 'commission'
      this.selectedBarber.rate = this.commission + '%'
    }
    else if(this.payType == 'Booth_Rent'){
      console.log('Booth Rent Changed',this.rent,this.per);
      this.selectedBarber.type = 'booth rent'
      this.selectedBarber.rate = '$' + this.rent + this.per 
    }

    console.log('-- Changes done to selected Barber ---', this.selectedBarber);
    // Make API CALL here to edit baber ---- ====
    // Make API CALL here to edit baber ---- ====
    // Make API CALL here to edit baber ---- ====
    // Make API CALL here to edit baber ---- ====
    // Make API CALL here to edit baber ---- ====
    this.dialogRef.close()
   }

    exit(){
      this.dialogRef.close()
    }
    

  ngOnInit() {
    this.selectedBarber = this.data;
    console.log('--- Selected Barber ---',this.selectedBarber);
    if(this.selectedBarber.type == 'hourly'){
      this.payType = 'Hourly'
      this.hourly = this.selectedBarber.rate.split('/')[0].replace('$','')
      console.log('Paytype chosen-->>',this.payType,this.hourly);
    }
    else if(this.selectedBarber.type == 'commission'){
      this.payType = 'Commission'
      this.commission = this.selectedBarber.rate.split('%')[0]
      console.log('Paytype chosen-->>',this.payType,this.commission);
    }
    else{
      this.payType = 'Booth_Rent'
      this.rent = this.selectedBarber.rate.split('/')[0].replace('$','')
      this.per = '/' + this.selectedBarber.rate.split('/')[1] 
      console.log('Paytype chosen-->>',this.payType,this.rent,this.per);
    }
    
  }

}
