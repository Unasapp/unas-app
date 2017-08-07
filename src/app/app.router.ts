import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component"


export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router)