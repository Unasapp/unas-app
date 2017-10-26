import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from  '../report-service.service';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.css']
})
export class ServicesDialogComponent implements OnInit {

  selectedService: any;
  modalText= {
    button: "",
    title: "",
  }

  constructor(public dialogRef: MdDialogRef<ServicesDialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any,
  private service: ReportServiceService) { }

  onCloseConfirm(service){
    if (service.v_id) {
      this.service.editServices(service).subscribe(data => {
        console.log("back from db edit", data)
        data[0].status = "edited"
        this.dialogRef.close(data[0])
      })
    } else {
      service.shop_id = JSON.parse(localStorage.getItem('profile'))[0].shop_id
      this.service.addServices(service).subscribe()
      this.dialogRef.close(service)
    }
  }

  onCloseCancel(){
    this.dialogRef.close({status:"canceled"})
  }

  onDelete(service){
    console.log('deleting', service)
    this.service.deleteServices(service).subscribe(data => {
      console.log(data.msg)
      if (data.msg = "Success") {
        service.status = "deleted"
        this.dialogRef.close(service)
      } else {
        alert(data.msg)
      }
    })
  }

  ngOnInit() {
    this.selectedService = this.data
    this.data.new
    ? this.modalText ={button: "Add", title:"New"}
    : this.modalText ={button: "Save", title:"Edit"}
    console.log(this.selectedService)
  }

}
