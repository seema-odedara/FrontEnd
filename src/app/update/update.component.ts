import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UpdateComponent implements OnInit {
  

  employeeId: any;
  employeeForm: any;

  constructor(
    private myService: ApiCallsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { }

  imagePreview: string | null = null;
  empData:any;

  ngOnInit(): void {
    this.employeeId = this.data.id

    this.employeeForm = this.fb.group({
      id: [{ value: this.employeeId, disabled: true }],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      pinCode: ['', Validators.required],
      accessRole: ['', Validators.required],
      isActive: [],
    });


    this.myService.getEmployeeById(this.employeeId).subscribe((res) => {
      this.employeeForm.patchValue(res);

      console.log(res)
      this.empData=res;

      if (this.empData.fileData) {
        this.imagePreview = 'data:image/jpeg;base64,' + this.empData.fileData;
      }
    })
  }

  selectedFile: File | null = null;


  updateStudent() {



    const formData = new FormData();

    // Clone the form value and enable 'id' for submission
    const formValue = {
      ...this.employeeForm.getRawValue(), // includes disabled `id`
    };
  
    // Append the JSON blob
    const employeeBlob = new Blob([JSON.stringify(formValue)], { type: 'application/json' });
    formData.append('employee', employeeBlob);
  
    // Append the file if selected
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.myService.updateEmployee(this.employeeId, formData).subscribe((res) => {
      this.dialogRef.close(res);
    })

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  

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

  onToggleIsActive(event: Event) {
    const input = event.target as HTMLInputElement;
    this.employeeForm.get('isActive')?.setValue(input.checked);
  }

}