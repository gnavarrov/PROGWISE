import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { FormRegistrationComponent } from './form-registration/form-registration.component';  // Importa tu componente FormRegistration
import { FormLoginComponent } from './form-login/form-login.component';
import {FormRegistrationComponent} from "./form-registration/form-registration.component";
import {ContactComponent} from "./contact/contact.component";


const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta por defecto para el componente Home
  { path: 'registro', component: FormRegistrationComponent },  // Ruta para el componente de registro
  { path: 'login', component: FormLoginComponent },  // Ruta para el componente de registro
{ path: 'contact', component: ContactComponent }  // Ruta para el componente de registro
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
