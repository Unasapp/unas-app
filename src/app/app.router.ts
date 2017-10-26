import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { CalenderComponent } from './calender/calender.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AllbarbersComponent } from './allbarbers/allbarbers.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReportsComponent } from './reports/reports.component';
import { BarberDetailsComponent } from './barber-details/barber-details.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component'



export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'cal', component: CalenderComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'calender', component: CalenderComponent },
    { path: 'allbarbers', component: AllbarbersComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'barber-details', component: BarberDetailsComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'services', component: ServicesComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router)
