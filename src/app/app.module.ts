import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
// import { CallbackComponent } from './callback/callback.component';
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
    MdDialogModule
 } from '@angular/material';

import { routes } from './app.router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CalenderComponent } from './calender/calender.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AllbarbersComponent } from './allbarbers/allbarbers.component';
import { BarberComponent } from './barber/barber.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FilterPipe } from './filter.pipe';
import { ContactsdialogComponent } from './contactsdialog/contactsdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CalenderComponent,
    ContactsComponent,
    AllbarbersComponent,
    BarberComponent,
    SettingsComponent,
    NotificationsComponent,
    FilterPipe,
    ContactsdialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    FormsModule
  ],
  entryComponents: [
    ContactsdialogComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
