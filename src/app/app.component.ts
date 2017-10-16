import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket = io();

  ngOnInit() {

    this.socket.on('news', function (data) {
      alert(data.msg);
    }.bind(this));

    this.socket.on('delete-request', function (data) {
      alert(data.msg);
    }.bind(this));

    this.socket.on('appt-start', function (data) {
      alert(data.msg);
    }.bind(this));

  }

}
