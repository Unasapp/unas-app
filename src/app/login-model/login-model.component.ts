import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ReportServiceService } from '../report-service.service';


@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.css']
})
export class LoginModelComponent implements OnInit {
  newUser:boolean;
  userData = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'shopId': NaN,
    'shopOwner': false
  }

  shopData = {
    's_name' : '',
    'address' : ''
  }

  shops:any;

  constructor(
    public dialogRef: MdDialogRef<LoginModelComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    public router: Router,
    public service: ReportServiceService) { }

  ngOnInit() {
    this.service.getShops().subscribe((data) => {
      this.shops = data
    })
  }



  login(){
    if (this.newUser && this.userData.shopOwner) {

        this.service.addNewShop(this.shopData).subscribe((data) => {
          this.userData.shopId = data[0].s_id
          this.service.addUser(this.userData).subscribe((data) => {
            if (!data.fail) {
              localStorage.setItem('profile', JSON.stringify(data))
              this.service.getBarbers({id:this.userData.shopId}).subscribe((data) => {
                console.log('getting barber data',data);
                localStorage.setItem('barbers', JSON.stringify(data))
              })
              this.service.getContacts({id:this.userData.shopId}).subscribe((data) => {
                localStorage.setItem('clients', JSON.stringify(data))
              })
              this.service.getServices({id:this.userData.shopId}).subscribe((data) => {
                localStorage.setItem('services', JSON.stringify(data))
              })
              this.dialogRef.close()
              this.router.navigate(['/home'])
            } else {
              alert(data.fail)
            }
          })
        })

    } else if (this.newUser && !this.userData.shopOwner) {

        this.service.addUser(this.userData).subscribe((data) => {
          if (!data.fail) {
            localStorage.setItem('profile', JSON.stringify(data))
            this.service.getBarbers({id:this.userData.shopId}).subscribe((data) => {
              console.log('getting barber data',data);
              localStorage.setItem('barbers', JSON.stringify(data))
            })
            this.service.getContacts({id:this.userData.shopId}).subscribe((data) => {
              localStorage.setItem('clients', JSON.stringify(data))
            })
            this.service.getServices({id:this.userData.shopId}).subscribe((data) => {
              localStorage.setItem('services', JSON.stringify(data))
            })
            this.dialogRef.close()
            this.router.navigate(['/calender'])
          } else {
            alert(data.fail)
          }
        })

    } else {
      this.service.login(this.userData).subscribe((data) => {
        console.log(data)
        this.service.getBarbers({id:data[0].shop_id}).subscribe((data) => {
          console.log('getting barber data',data);
          localStorage.setItem('barbers', JSON.stringify(data))
        })
        this.service.getContacts({id:data[0].shop_id}).subscribe((data) => {
          localStorage.setItem('clients', JSON.stringify(data))
        })
        this.service.getServices({id:data[0].shop_id}).subscribe((data) => {
          localStorage.setItem('services', JSON.stringify(data))
        })
        if (data[0].type === 'admin') {
          localStorage.setItem('profile', JSON.stringify(data))
          this.dialogRef.close()
          this.router.navigate(['/home'])
        } else if (data[0].type === 'user') {
          localStorage.setItem('profile', JSON.stringify(data))
          this.dialogRef.close()
          this.router.navigate(['/calender'])
        } else {
          alert("Username or password is invalid!")
        }
      })
    }

  }

  onCloseCancel(){
    this.dialogRef.close()
  }


}
