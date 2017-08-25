import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ContactsdialogComponent } from '../contactsdialog/contactsdialog.component'
import { FilterPipe } from '../filter.pipe'


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  name: any;
  ifopen: true;
  users: any;
  dialogResult: any;
  deleted: any;
  constructor(private http: HttpClient, public dialog: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(ContactsdialogComponent,{
      width: '600px',
      data: 'this text is passed'
    })

    dialogRef.afterClosed().subscribe(result =>{
      this.dialogResult = result;

      if(result !== undefined){
      let newuser = {
        'name': result.firstname + ' ' + result.lastname,
        'email': result.email,
        'phone': result.phonenumber
      }
      this.users.push(newuser)
      }

    })

  }

  onDelete(para){
    for(var i=0; i<this.users.length; i++){
      if(this.users[i].name === para){
          this.users.splice(i,1)
          return this.users
        }
    }
  }

  ngOnInit() {
     this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
        this.users = data;
    });
  }

}
