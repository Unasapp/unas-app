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

  constructor(public dialogRef: MdDialogRef<BarberModalComponent>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.selectedBarber = this.data;
  }

}
