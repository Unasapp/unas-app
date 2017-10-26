import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ReportServiceService } from './report-service.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket = io()

constructor(private service: ReportServiceService, public snackBar: MdSnackBar){}

  ngOnInit() {
    this.socket.on('news', function (data) {
      alert(data.msg);
    }.bind(this));

    this.socket.on('delete-request', function (data) {
      this.snackBar.open(data.msg, "Dismiss", {duration: 5000})
      console.log(data);
    }.bind(this));

    this.socket.on('appt-start', function (data) {
      this.snackBar.open(data[1], "Dismiss", {duration: 5000});
      console.log("Alert!:", data[1]);
    }.bind(this));

    this.socket.on('appt-end', function (data) {
      this.snackBar.open(data[1], "Dismiss", {duration: 5000});
      console.log("Alert!:", data[1]);
    }.bind(this));
  }

}
