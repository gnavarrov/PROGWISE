import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';  // Asegúrate de importar tu componente Dashboard

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirecciona a '/home' como ruta por defecto
  { path: 'home', component: HomeComponent },  // Ruta para la página principal
  { path: 'registro', component: FormRegistrationComponent },  // Ruta para el formulario de registro
  { path: 'login', component: FormLoginComponent },  // Ruta para el formulario de login
  { path: 'contact', component: ContactComponent },  // Ruta para la página de contacto
  { path: 'dashboard', component: DashboardComponent }  // Ruta para el Dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
