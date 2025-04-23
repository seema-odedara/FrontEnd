import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { DisplayComponent } from './display/display.component';
import { authGuard } from './auth.guard';
import { AdminDataComponent } from './admin-data/admin-data.component';

const routes: Routes = [{
  path: "",
  component: LoginComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "registration",
  component: RegistrationComponent
},
{
  path: "dashboard",
  component: DashboardComponent,
  children: [ 
    { path: '', component: AdminDataComponent },
    { path: 'display', component: DisplayComponent }
  ],
  canActivate: [authGuard],
},
{
  path: "forgotpassword",
  component: ForgotPasswordComponent
},
{
  path: "forgotpasswordpage",
  component: ForgotPasswordPageComponent
},
{
  path: "**",
  component: ErrorPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
