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

  onCloseConfirm(srvc){
    var newService:any
    if (srvc.v_id) {
      this.service.editServices(srvc).subscribe(data => {
        console.log("back from db edit", data)
        newService = data[0]
        newService.status = "edited"
        this.service.getServices({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe((data2) => {
          localStorage.setItem('services', JSON.stringify(data2))
        })
        this.dialogRef.close(newService)
      })
    } else {
      srvc.shop_id = JSON.parse(localStorage.getItem('profile'))[0].shop_id
      this.service.addServices(srvc).subscribe(data3 => {
        console.log("data from add srvc", data3)
        newService = data3[0]
        newService.status = "added"
        this.service.getServices({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe((data4) => {
          localStorage.setItem('services', JSON.stringify(data4))
        })
        this.dialogRef.close(newService)
      })
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
        this.service.getServices({id:JSON.parse(localStorage.getItem('profile'))[0].shop_id}).subscribe((data) => {
          localStorage.setItem('services', JSON.stringify(data))
        })
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
