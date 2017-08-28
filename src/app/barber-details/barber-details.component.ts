import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barber-details',
  templateUrl: './barber-details.component.html',
  styleUrls: ['./barber-details.component.css']
})
export class BarberDetailsComponent implements OnInit {
  pay: string;

  constructor() { }

  ngOnInit() {
  }

}
