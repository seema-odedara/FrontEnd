import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ApiCallsService } from '../api-calls.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient } from '@angular/common/http';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm : any;

  constructor(private fb:FormBuilder, private router: Router, private myService:ApiCallsService, private http: HttpClient, private authService: AdminDataService){}

  storage = inject(StorageService)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formControl(){
    return this.loginForm.controls;
  }

  onLogin(){

    if(this.loginForm.value['username'] && this.loginForm.value['password']){
      this.myService.loginEmployee(this.loginForm.value).subscribe(

        {
          next: (res: any) => {
            
            const response = JSON.parse(res);
            if(response && response.token){
              this.storage.saveDataToLocalStorage('token', response.token);
              this.authService.setUsername(response.username);
              this.router.navigate(['/dashboard'])
            }
  
          },
          error: (err) => {
            console.error("Login error: ", err);
            if (err.status === 403) {
              alert("Invalid username or password.");
            } else {
              alert("Something went wrong. Please try again later.");
            }
          }
        }
      )
    }else{
      alert("username or password must be required!!")
    }
  }


//   captchaUrl = 'http://localhost:8080/employee/getCaptcha';
// userInput = '';
// message = '';

// reload() {
//   this.captchaUrl = 'http://localhost:8080/employee/getCaptcha?rnd=' + Math.random();
// }

// verify() {
//   this.http.post('http://localhost:8080/employee/verifyCaptcha', {
//     captcha: this.userInput
//   }, { withCredentials: true }).subscribe({
//     next: res => {this.message = '✅ Captcha verified!';
//       console.log("res",res);
//     },
//     error: () => this.message = '❌ Captcha failed!'
//   });
// }

}
