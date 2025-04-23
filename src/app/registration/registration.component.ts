import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  registrationForm: any;

  constructor(private myService: ApiCallsService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      homeTown: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      isActive: []
    });
  }


  saveEmployee() {
    this.myService.saveEmployee(this.registrationForm.value).subscribe(
      //   (res) => {
      //   console.log("skdfhksdjhfksjdhf")
      //   this.dialog.open(MessageDialogComponent, {
      //     width: '300px',
      //     enterAnimationDuration:'500ms',
      //     exitAnimationDuration: '300ms',
      //     data: { title: 'Message', message: res }
      //   });

      //   this.registrationForm.reset();
      // }


      {
        next: (res: any) => {

          console.log("skdfhksdjhfksjdhf")

          this.dialog.open(MessageDialogComponent, {
            width: '300px',
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '300ms',
            data: { title: 'Message', message: res }
          });

          this.registrationForm.reset();

        },
        error: (err) => {
          if (err.status === 403) {
            alert("You don’t have permission");
          } else {
            alert("Something went wrong. Please try again later.");
          }
          this.registrationForm.reset();
        }
      }


    )
  }

  // Function to toggle password visibility
  togglePassword(inputId: string, iconId: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const icon = document.getElementById(iconId) as HTMLElement;

    if (input && icon) {
      if (input.type === "password") {
        input.type = "text";
        icon.innerText = "🙉"; // Open eye icon
      } else {
        input.type = "password";
        icon.innerText = "🙈"; // Closed eye (monkey covering eyes)
      }
    }
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

}

