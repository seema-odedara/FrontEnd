import { Component, Inject } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: false,
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

  constructor(
    private myService:ApiCallsService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  delete(){
    this.myService.deleteEmployee(this.data.id).subscribe((res)=>{
      this.dialogRef.close(res);
    })

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}