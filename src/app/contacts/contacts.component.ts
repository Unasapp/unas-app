import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BarberComponent } from '../barber/barber.component'



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  name: any;
  users: any;

  constructor(private http: HttpClient, public dialog: MdDialog) { }

  openDialog() {
    this.dialog.open(BarberComponent);
  }

  ngOnInit() {

     this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
        this.users = data;
        console.log('users',this.users);
    });
  }

}
