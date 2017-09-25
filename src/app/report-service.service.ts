import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportServiceService {


  constructor(public http:Http) { }

  public testPoint() {
    console.log('testPoint called');
    
    return this.http.get('/api/test')
      .map(res => res.json());
  }

  public addEvent(appt){
    console.log('-- addAppts called in service --');
    return this.http.post('/api/add-appt', appt)
      .map(res => res.json());
  } 

  getShopTrans(id:any) {
    return this.http.post('/api/shop-trans', id)
      .map(res => res.json())
  }

  getTimecards(id:any) {
    return this.http.post('/api/timecards', id)
      .map(res => res.json())
  }

  getContacts(id:any) {
    return this.http.post('/api/contacts', id)
      .map(res => res.json())
  }

  addContact(contact) {
    return this.http.post('/api/add-contact', contact)
      .map(res => res.json())
  }

  deleteContact(contact) {
    console.log('service')
    return this.http.post('/api/delete-contact', contact)
      .map(res => res.json())
  }

  getBarbers(id) {
    console.log('service')
    return this.http.post('/api/barbers', id)
    .map(res => res.json())
  }

  getServices(id) {
    console.log('service')
    return this.http.post('/api/services', id)
    .map(res => res.json())
  }

  getAppts(id) {
    console.log('--- getting appt from service ---')
    return this.http.post('/api/cal', id)
    .map(res => res.json())
  }

  deleteAPPT(id){
    console.log(id);

  }
  editEvent(editedEvent){
    console.log(editedEvent);

  }
}
