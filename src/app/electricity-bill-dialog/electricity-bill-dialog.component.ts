import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-electricity-bill-dialog',
  templateUrl: './electricity-bill-dialog.component.html',
  styleUrls: ['./electricity-bill-dialog.component.css']
})
export class ElectricityBillDialogComponent {


@Component({
  selector: 'app-electricity-bill-dialog',
  templateUrl: './electricity-bill-dialog.component.html',
  styleUrls: ['./electricity-bill-dialog.component.css']
})

  electricityBillForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ElectricityBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.electricityBillForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      unitsUsed: ['', Validators.required],
      amount: ['']
    });

    if (data.electricityBill) {
      this.electricityBillForm.patchValue(data.electricityBill);
    }
  }

  saveElectricityBill() {
    const electricityBill = this.electricityBillForm.value;
    electricityBill.id = this.data.electricityBill ? this.data.electricityBill.id : null;
    this.dialogRef.close(electricityBill);
  }

  cancel() {
    this.dialogRef.close();
  }
}

