import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MdDatepickerModule } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';


@Component({
  selector: 'app-apptdialog',
  templateUrl: './apptdialog.component.html',
  styleUrls: ['./apptdialog.component.css']
})
export class ApptdialogComponent implements OnInit {
  time = [];

  clients = [
    {value: 'Lesley Rico', viewValue: 'Lesley Rico'},
    {value: 'Bittany Jensen', viewValue: 'Bittany Jensen'},
    {value: 'Carlo Jimenez', viewValue: 'Carlo Jimenez'},
    {value: 'Mike Hunt', viewValue: 'Mike Hunt'},
    {value: 'Kwatasha Smith', viewValue: 'Kwatasha Smith'}
  ];

  barbers = [
    {value: 'Harry Vu', viewValue: 'Harry'},
    {value: 'Dominic DeCicco', viewValue: 'Dominic'},
    {value: 'Andrew Chen', viewValue: 'Andrew'}
  ];

  services = [
    {value: 'haircut', viewValue: 'Haircut'},
    {value: 'beardtrim', viewValue: 'Beard Trim'},
    {value: 'lineup', viewValue: 'Line-up'},
    {value: 'fade', viewValue: 'Fade'},
    {value: 'shave', viewValue: 'Traditional Shave'}
  ];

  constructor(
    public dialogRef: MdDialogRef<ApptdialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  makeTime(){
     for (var i = 1; i < 13; i++) {
        for (var j = 0; j < 47; j=j+15) {
          if(j===0){
            this.time.push(i+':0'+j)
          }
          else{
            this.time.push(i+':'+j)
          }
        }
      }
  }


  ngOnInit() {
    this.makeTime()
  }

  onCloseConfirm(barber, service, customer, date, timep, timeam, firstname, lastname, phonenumber, email){
    var timeH = timep.split(':')[0]
    var timeM = timep.split(':')[1]
    timeam === 'pm' ? timeH = Number(timeH) + 12 : timeH = timeH;
  
    if(!customer){
      let customer = firstname + ' ' + lastname;
      let newappt = {
        barber, service, customer, 'date': moment(date).hour(timeH).minute(timeM).format('LLLL')
      };
      console.log(newappt);
      this.dialogRef.close(newappt)
    } else{
      let newappt = {
        barber, service, customer, 'date': moment(date).hour(timeH).minute(timeM).format('LLLL')
      };
      console.log(newappt);
      this.dialogRef.close(newappt)
    }
    
    
  }

  onCloseCancel(){
    this.dialogRef.close()
  }

}
