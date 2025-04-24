import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallsService } from '../api-calls.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {
  

  employeeId: any;
  employeeForm: any;

  constructor(
    private myService: ApiCallsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { }

  imagePreview: string | null = null;
  empData:any;

  ngOnInit(): void {
    this.employeeId = this.data.id

    this.employeeForm = this.fb.group({
      id: [{ value: this.employeeId, disabled: true }],
      name: [{value: '', disabled: true}, Validators.required],
      dob: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      username: [{value: '', disabled: true}, Validators.required],
      password: [{value: '', disabled: true}, Validators.required],
      gender: [{value: '', disabled: true}, Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      contactNumber: [{value: '', disabled: true}, Validators.required],
      pinCode: [{value: '', disabled: true}, Validators.required],
      accessRole: [{value: '', disabled: true}, Validators.required],
      isActive: [{value: '', disabled: true},],
    });


    this.myService.getEmployeeById(this.employeeId).subscribe((res) => {
      this.employeeForm.patchValue(res);

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

  getInitials(): string {
    if (!this.empData.name) return '';
    const words = this.empData.name.trim().split(' ');
    let initials = words[0]?.charAt(0).toUpperCase();
    if (words.length > 1) {
      initials += words[1]?.charAt(0).toUpperCase();
    }
    return initials;
  }

}
