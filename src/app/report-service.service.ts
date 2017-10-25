import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as io from 'socket.io-client';

@Injectable()
export class ReportServiceService {


  barbers = JSON.parse(localStorage.getItem('barbers'))
  clients = JSON.parse(localStorage.getItem('clients'))
  services = JSON.parse(localStorage.getItem('services'))

  cashout = []


  constructor(public http:Http) { }


  testPoint() {
    console.log('testPoint called');
    return this.http.get('/api/test')
      .map(res => res.json());
  }

  addUser(data) {
    console.log('adding user', data)
    return this.http.post('/api/add-user', data)
      .map(res => res.json())
  }

  login(data) {
    console.log('logging in', data)
    return this.http.post('/api/login', data)
      .map(res => res.json())
  }

  addAppts(appt){
    console.log('-- addAppts called in service --',appt);
    return this.http.post('/api/add-appt', appt)
      .map(res => res.json());
  }

  getShopTrans(id:any) {
    return this.http.post('/api/shop-trans', id)
      .map(res => res.json())
  }

  deleteTrans(id){
    return this.http.post('/api/delete-trans',{id})
      .map(res => res.json())
  }
 
  editTrans(obj){
    return this.http.post('/api/edit-trans',obj)
    .map(res => res.json())
  }

  getTimecards(id:any) {
    return this.http.post('/api/timecards', id)
      .map(res => res.json())
  }

  deleteTimecard(x) {
    return this.http.post('/api/timecards/delete', { 'id' : x } )
      .map(res => res.json())
  }

  timesaveEdit(x){
    var save = {
      't_id' : x.t_id,
      'time_in' : moment(x.time_in).format('YYYY-MM-DD HH:mm:ss'),
      'time_out' : moment(x.time_out).format('YYYY-MM-DD HH:mm:ss')
    }
    return this.http.post('/api/timecards/save', save)
      .map(res => res.json())
  }

  getBarberEarning(x){
    console.log('--- 😇 barber earnings called ---');
    
    return this.http.post('/api/shop-trans/earnings',x)
      .map(res => {
        console.log('--- 😇 barber earnings comming back!!!!! ---', res.json());
         return res.json()
        })
  }

  getContacts(id:any) {
    return this.http.post('/api/contacts', id)
      .map(res => res.json())
  }

  addContact(contact) {
    console.log('-- add Contact called in service ---',contact);
    return this.http.post('/api/add-contact', contact)
      .map(res => res.json())
  }

  editContact(contact) {
    console.log('editing contact', contact)
    return this.http.post('/api/edit-contact', contact)
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

  editBarberPay(barber) {
    return this.http.post('/api/edit-barber-pay', barber)
    .map(res => res.json())
  }

  deleteBarber(barber) {
    return this.http.post('/api/delete/barber', {id: barber.b_id})
    .map(res => res.json())
  }

  getInProgress(id) {
    return this.http.post('/api/in-progress', id)
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

  deleteAPPT(ids){
    console.log('-- ids to delete appts --',ids);
    return this.http.post('/api/cal/delete',ids)
    .map(res => res.json())
  }

  getDeleteRequests(id) {
    return this.http.post('/api/get-delete-requests', id)
    .map(res => res.json())
  }

  editAppt(editedEvent){
    let edit = {
      'dataID': editedEvent.dataID,
      'barber_id'  : 1,
      'client_id'  : 1,
      'service_id'  : 1,
      'shop_id'  : editedEvent.shop_id,
      'start_time' : moment(editedEvent.start).format('YYYY-MM-DD HH:mm:ss'),
      'end_time' : moment(editedEvent.end).format('YYYY-MM-DD HH:mm:ss')
    }
    this.clients.filter((x)=>{
      if( x.c_first == editedEvent.client.split(' ')[0]){
        return edit.client_id = Number(x.c_id)
      }
    })
    this.barbers.filter((x)=>{
      if( x.b_first == editedEvent.title.split(' ')[0]){
        return edit.barber_id = Number(x.b_id)
      }
    })
    this.services.filter((x)=>{
      if( x.service == editedEvent.service ){
        return edit.service_id = Number(x.v_id)
      }
    })

    console.log('editAppt called in service',edit);
    return this.http.post('/api/cal/edit', edit)
    .map(res => res.json())

  }

  getProducts(id){
    console.log('-- id to get products --',id);
    return this.http.post('/api/getproducts',id)
    .map(res => res.json())
  }


}
