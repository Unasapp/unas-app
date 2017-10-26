import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { CalendarModule } from "ap-angular2-fullcalendar";
import { ChartsModule } from 'ng2-charts';
import {
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdCardModule,
    MdTableModule,
    MdInputModule,
    MdDialogModule,
    MdDatepickerModule,
    MdRadioModule,
    MdSelectModule,
    MdNativeDateModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdExpansionModule
 } from '@angular/material';

import { routes } from './app.router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CalenderComponent } from './calender/calender.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AllbarbersComponent } from './allbarbers/allbarbers.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FilterPipe } from './filter.pipe';
import { ContactsdialogComponent } from './contactsdialog/contactsdialog.component';
import { ReportsComponent } from './reports/reports.component';
import { CashoutdialogComponent } from './cashoutdialog/cashoutdialog.component';
import { ApptdialogComponent } from './apptdialog/apptdialog.component';
import { BarberDetailsComponent } from './barber-details/barber-details.component';
import { ReportServiceService } from './report-service.service';
import { BarberModalComponent } from './barber-modal/barber-modal.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { LoginModelComponent } from './login-model/login-model.component';
import { ProductsComponent } from './products/products.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ServicesComponent } from './services/services.component';
import { ServicesDialogComponent } from './services-dialog/services-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CalenderComponent,
    ContactsComponent,
    AllbarbersComponent,
    SettingsComponent,
    NotificationsComponent,
    FilterPipe,
    ContactsdialogComponent,
    ReportsComponent,
    CashoutdialogComponent,
    ApptdialogComponent,
    BarberDetailsComponent,
    ProductDialogComponent,
    BarberModalComponent,
    LoginModelComponent,
    ProductsComponent,
    SidenavComponent,
    ServicesComponent,
    ServicesDialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    routes,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdCardModule,
    MdTableModule,
    MdInputModule,
    MdDialogModule,
    MdDatepickerModule,
    FormsModule,
    CommonModule,
    CalendarModule,
    MdRadioModule,
    MdSelectModule,
    MdNativeDateModule,
    MdSliderModule,
    MdSlideToggleModule,
    ChartsModule,
    MdSnackBarModule,
    MdExpansionModule
  ],
  entryComponents: [
    ContactsdialogComponent,
    CashoutdialogComponent,
    ApptdialogComponent,
    BarberModalComponent,
    ProductDialogComponent,
    BarberModalComponent,
    LoginModelComponent,
    ServicesDialogComponent
  ],
  providers: [ReportServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
