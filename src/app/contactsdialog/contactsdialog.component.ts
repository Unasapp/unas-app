import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ReportServiceService } from  '../report-service.service'


@Component({
  selector: 'app-contactsdialog',
  templateUrl: './contactsdialog.component.html',
  styleUrls: ['./contactsdialog.component.css']
})
export class ContactsdialogComponent implements OnInit {
  selectedContact:any;
  modalText= {
    button: "",
    title: "",
  }

  constructor(
    public dialogRef: MdDialogRef<ContactsdialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private service: ReportServiceService
  ) { }

  ngOnInit() {
    this.selectedContact = this.data
    this.data.new
    ? this.modalText ={button: "Add", title:"New"}
    : this.modalText ={button: "Save", title:"Edit"}
    console.log(this.selectedContact)
  }

  onCloseConfirm(contact){
    contact.shop_id = JSON.parse(localStorage.getItem('profile'))[0].shop_id
    if (contact.c_id) {
      this.service.editContact(contact).subscribe(data => {
        console.log("back from db edit", data)
        data[0].status = "edited"
        this.dialogRef.close(contact) 
      })
    } else {
      contact.c_shop = JSON.parse(localStorage.getItem('profile'))[0].shop_id
      this.service.addContact(contact).subscribe(data => {
        console.log("back from db add", data)
        data[0].status = "added"
        this.dialogRef.close(data[0])
      })
    }
  }

  onDelete(contact){
    console.log('deleting', contact)
    this.service.deleteContact(contact).subscribe(data => {
      console.log(data.msg)
      if (data.msg = "Success") {
        contact.status = "deleted"
        this.dialogRef.close(contact)
      } else {
        alert(data.msg)
      }
    })
  }

  onCloseCancel(){
    this.dialogRef.close({status:"canceled"})
  }

}
