import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor {

  storage = inject(StorageService);
  router = inject(Router);

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const jwtHelper = new JwtHelperService();

    console.log('HTTP Interceptor triggered for:', req.url);

    console.log("request", req);
    
    // if (req.url.includes('/employee/login') || req.url.includes('/employee/getCaptcha') || req.url.includes('/employee/verifyCaptcha')){
      if (req.url.includes('/employee/login')){
      return next.handle(req);
    }
    console.log("required token for this request")

    const token = this.storage.getDataFromLocalStorage('token');
    if (!token) {
      console.warn('No token found! Redirecting to login.');
      this.router.navigate(['/login']); 
      throw new Error('No token present');
    }

    // if (jwtHelper.isTokenExpired(token)) {
    //   console.warn('Token expired! Redirecting to login.');
    //   localStorage.removeItem('token');
    //   this.router.navigate(['/login']);
    //   throw new Error('Token expired');
    // }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.error === 'Token has expired') {
          console.warn("Backend says: Token has expired");

          // Clean up and redirect
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        // You can also show a toast here if you want
        return throwError(() => error);
      })
    );

  }
}
