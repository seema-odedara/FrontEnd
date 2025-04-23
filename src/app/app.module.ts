import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateComponent } from './update/update.component';
import { AuthInterceptorsService } from './auth-interceptors.service';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ErrorPageComponent,
    ForgotPasswordComponent,
    ForgotPasswordPageComponent,
    MessageDialogComponent,
    DisplayComponent,
    DeleteDialogComponent,
    UpdateComponent,
    AdminDataComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorsService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
